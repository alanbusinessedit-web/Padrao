import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES } from "../config";
import { fontFamily } from "../fonte";
import { CaixaTexto } from "../components/CaixaTexto";
import { Fundo } from "../components/Fundo";

const FRAME_17H = 95;

const Relogio = ({ minutos, destaque }) => {
  const anguloMin = (minutos % 60) * 6;
  const anguloHora = ((Math.floor(minutos / 60) % 12) + (minutos % 60) / 60) * 30;
  const hh = String(Math.floor(minutos / 60)).padStart(2, "0");
  const mm = String(Math.floor(minutos % 60)).padStart(2, "0");

  return (
    <g>
      <circle cx={0} cy={0} r={290 + destaque * 30} fill={CORES.amarelo} opacity={0.25 * destaque} />
      <circle cx={0} cy={0} r={270} fill={CORES.amarelo} />
      <circle cx={0} cy={0} r={235} fill={CORES.creme} />
      {new Array(12).fill(0).map((_, i) => (
        <rect
          key={i}
          x={-7}
          y={-215}
          width={14}
          height={i % 3 === 0 ? 44 : 26}
          rx={7}
          fill={i === 5 ? CORES.vermelho : CORES.roxoClaro}
          transform={`rotate(${i * 30})`}
        />
      ))}
      <rect x={-13} y={-130} width={26} height={150} rx={13} fill={CORES.roxo} transform={`rotate(${anguloHora})`} />
      <rect x={-8} y={-195} width={16} height={215} rx={8} fill={CORES.vermelho} transform={`rotate(${anguloMin})`} />
      <circle cx={0} cy={0} r={22} fill={CORES.roxo} />

      <rect x={-150} y={310} width={300} height={100} rx={26} fill={destaque > 0.5 ? CORES.vermelho : CORES.azulNoite2} />
      <text x={0} y={382} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={70} fill={CORES.branco}>
        {hh}:{mm}
      </text>
    </g>
  );
};

const Cadeado = ({ fechamento, brilho }) => (
  <g>
    <circle cx={0} cy={40} r={210 + brilho * 50} fill={CORES.verde} opacity={0.3 * (1 - brilho)} />
    <path
      d="M -80 20 L -80 -60 A 80 80 0 0 1 80 -60 L 80 20"
      stroke={CORES.cinzaUrna2}
      strokeWidth={36}
      strokeLinecap="round"
      fill="none"
      transform={`translate(0 ${interpolate(fechamento, [0, 1], [-60, 0])})`}
    />
    <rect x={-130} y={0} width={260} height={210} rx={36} fill={CORES.amarelo} />
    <rect x={-130} y={150} width={260} height={60} rx={30} fill="#f4b740" />
    <circle cx={0} cy={80} r={28} fill={CORES.azulNoite} />
    <rect x={-12} y={90} width={24} height={60} rx={12} fill={CORES.azulNoite} />
  </g>
);

// Cena 3 (11-18s): relógio chega às 17:00, dados viram bits e são trancados.
export const Cena3Criptografia = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({ frame, fps, config: { damping: 13 } });
  const giro = interpolate(frame, [8, FRAME_17H], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const minutos = 16 * 60 + 60 * giro;
  const destaque = spring({ frame: frame - FRAME_17H, fps, config: { damping: 8 } });

  // depois das 17h o relógio vai para a esquerda e o cadeado entra à direita
  const mover = spring({ frame: frame - 110, fps, config: { damping: 15 } });
  const relX = interpolate(mover, [0, 1], [540, 290]);
  const relY = interpolate(mover, [0, 1], [880, 860]);
  const relEscala = interpolate(mover, [0, 1], [1, 0.6]) * entrada;

  const entradaCadeado = spring({ frame: frame - 120, fps, config: { damping: 11 } });
  const fechamento = spring({ frame: frame - 165, fps, config: { damping: 9, stiffness: 200 } });
  const brilho = interpolate(frame, [168, 195], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Fundo de={CORES.azulNoite} para={CORES.azulNoite2} seed="cena3" corParticula={CORES.ciano} />
      <CaixaTexto texto="DADOS CRIPTOGRAFADOS" atraso={100} top={230} tamanho={74} fundo="rgba(6,214,160,0.2)" />

      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(${relX} ${relY}) scale(${relEscala})`}>
          <Relogio minutos={minutos} destaque={destaque} />
        </g>

        {/* bits voando do relógio para o cadeado */}
        {new Array(14).fill(0).map((_, i) => {
          const inicio = 125 + i * 3;
          const t = interpolate(frame, [inicio, inicio + 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          if (t <= 0 || t >= 1) return null;
          const x = interpolate(t, [0, 1], [380, 780]);
          const y = 820 + Math.sin(t * Math.PI) * -160 + (random(`b-${i}`) - 0.5) * 120;
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily={fontFamily}
              fontWeight={900}
              fontSize={interpolate(t, [0, 1], [56, 24])}
              fill={i % 2 ? CORES.verde : CORES.ciano}
              opacity={1 - t * 0.6}
            >
              {random(`v-${i}`) > 0.5 ? "1" : "0"}
            </text>
          );
        })}

        <g transform={`translate(790 820) scale(${entradaCadeado})`}>
          <Cadeado fechamento={fechamento} brilho={brilho} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
