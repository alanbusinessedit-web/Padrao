import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES } from "../config";
import { CaixaTexto } from "../components/CaixaTexto";
import { Fundo } from "../components/Fundo";

// Projeção simples (longitude/latitude -> pixels) para um mapa estilizado do Brasil.
const proj = ([lon, lat]) => [78 + (lon + 76) * 22, 520 + (6 - lat) * 22];

const CONTORNO = [
  [-60, 5], [-52, 4], [-50, 2], [-48, -1], [-44, -2.5], [-40, -3], [-35, -5.5], [-35, -9],
  [-39, -13], [-39, -17.5], [-41, -22], [-44, -23], [-48, -25.5], [-48.5, -28], [-53, -33.7],
  [-57, -30], [-54, -26], [-54.5, -25], [-58, -22], [-57.5, -17], [-60, -16], [-65, -12],
  [-70, -11], [-73.5, -9], [-74, -7], [-70, -4], [-69.5, -1], [-67, 1.5], [-64, 2],
].map(proj);

const CAPITAIS = [
  [-60, -3.1], [-48.5, -1.4], [-38.5, -3.7], [-34.9, -8.05], [-38.5, -13], [-43.2, -22.9],
  [-46.6, -23.5], [-49.3, -25.4], [-51.2, -30], [-56.1, -15.6], [-63.9, -8.8], [-67.8, -9.97],
  [-60.7, 2.8], [-51, 0], [-48.3, -10.2], [-42.8, -5.1], [-43.9, -19.9], [-54.6, -20.4],
].map(proj);

const CENTRO = proj([-47.9, -15.8]); // Brasília

const pontoBezier = (p0, p1, p2, t) => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
];

const comprimento = (p0, p1, p2) => {
  let total = 0;
  let anterior = p0;
  for (let i = 1; i <= 24; i++) {
    const p = pontoBezier(p0, p1, p2, i / 24);
    total += Math.hypot(p[0] - anterior[0], p[1] - anterior[1]);
    anterior = p;
  }
  return total;
};

const CONEXOES = CAPITAIS.map((origem, i) => {
  const meio = [(origem[0] + CENTRO[0]) / 2, (origem[1] + CENTRO[1]) / 2];
  const dx = CENTRO[0] - origem[0];
  const dy = CENTRO[1] - origem[1];
  const curva = i % 2 ? 0.25 : -0.25;
  const controle = [meio[0] - dy * curva, meio[1] + dx * curva];
  return { origem, controle, comprimento: comprimento(origem, controle, CENTRO) };
});

// Cena 5 (24-30s): linhas de conexão de todo o país fluindo para o centro.
export const Cena5Transparencia = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mapa = spring({ frame, fps, config: { damping: 14 } });
  const selo = spring({ frame: frame - 95, fps, config: { damping: 9, stiffness: 140 } });
  const pulsoCentro = (frame % 30) / 30;

  return (
    <AbsoluteFill>
      <Fundo de={CORES.marinho} para={CORES.marinho2} seed="cena5" corParticula={CORES.amarelo} />
      <CaixaTexto texto="TRANSPARÊNCIA TOTAL" atraso={12} top={230} tamanho={80} fundo="rgba(76,201,240,0.2)" />

      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(540 960) scale(${interpolate(mapa, [0, 1], [0.8, 1])}) translate(-540 -960)`} opacity={mapa}>
          <polygon points={CONTORNO.map((p) => p.join(",")).join(" ")} fill="#2a3b7a" />
          <polygon
            points={CONTORNO.map((p) => p.join(",")).join(" ")}
            fill="#33479a"
            transform="translate(540 960) scale(0.94) translate(-540 -960)"
            opacity={0.6}
          />
        </g>

        {CONEXOES.map((c, i) => {
          const inicio = 10 + i * 4;
          const desenho = interpolate(frame, [inicio, inicio + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const d = `M ${c.origem[0]} ${c.origem[1]} Q ${c.controle[0]} ${c.controle[1]} ${CENTRO[0]} ${CENTRO[1]}`;
          const cor = i % 3 === 0 ? CORES.amarelo : i % 3 === 1 ? CORES.ciano : CORES.verde;
          const no = spring({ frame: frame - inicio + 4, fps, config: { damping: 10 } });

          // "pacotes" de dados viajando sem parar até o centro
          const pacotes = [0, 0.5].map((desloc) => {
            const t = (((frame - inicio - 30) / 40 + desloc) % 1 + 1) % 1;
            return frame > inicio + 30 ? pontoBezier(c.origem, c.controle, CENTRO, t) : null;
          });

          return (
            <g key={i}>
              <path
                d={d}
                stroke={cor}
                strokeWidth={7}
                strokeLinecap="round"
                fill="none"
                opacity={0.8}
                strokeDasharray={c.comprimento}
                strokeDashoffset={c.comprimento * (1 - desenho)}
              />
              {pacotes.map((p, k) => p && <circle key={k} cx={p[0]} cy={p[1]} r={9} fill={CORES.branco} />)}
              <circle cx={c.origem[0]} cy={c.origem[1]} r={16 * no} fill={cor} />
            </g>
          );
        })}

        {/* centro: Brasília recebendo os dados */}
        <circle cx={CENTRO[0]} cy={CENTRO[1]} r={40 + pulsoCentro * 70} fill={CORES.amarelo} opacity={0.35 * (1 - pulsoCentro)} />
        <circle cx={CENTRO[0]} cy={CENTRO[1]} r={36} fill={CORES.amarelo} />

        <g transform={`translate(${CENTRO[0]} ${CENTRO[1]}) scale(${selo})`}>
          <circle cx={0} cy={0} r={100} fill={CORES.verde} />
          <path d="M -44 2 L -12 34 L 48 -30" stroke={CORES.branco} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
