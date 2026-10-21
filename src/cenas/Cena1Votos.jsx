import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES } from "../config";
import { fontFamily } from "../fonte";
import { CaixaTexto } from "../components/CaixaTexto";
import { Fundo } from "../components/Fundo";

const CORES_PESSOAS = [CORES.branco, CORES.amarelo, CORES.creme, "#ffd6a5", "#ffe5d9"];

const Pessoa = ({ x, y, cor, escala }) => (
  <g transform={`translate(${x} ${y}) scale(${escala})`}>
    <circle cx={0} cy={-40} r={21} fill={cor} />
    <path d="M -32 30 Q -32 -14 0 -14 Q 32 -14 32 30 Z" fill={cor} />
  </g>
);

// Cena 1 (0-5s): contador até 100 + "MILHÕES DE VOTOS" + multidão surgindo.
export const Cena1Votos = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numero = Math.round(
    interpolate(frame, [8, 70], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
  const pulso = spring({ frame: frame - 70, fps, config: { damping: 8, stiffness: 160 } });
  const escalaNumero = 1 + 0.12 * Math.sin(pulso * Math.PI);

  const colunas = 7;
  const linhas = 5;

  return (
    <AbsoluteFill>
      <Fundo de={CORES.laranja1} para={CORES.laranja2} seed="cena1" />

      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontWeight: 900,
          fontSize: 300,
          lineHeight: 1,
          color: CORES.branco,
          transform: `scale(${escalaNumero})`,
          textShadow: "0 18px 0 rgba(0,0,0,0.08)",
        }}
      >
        {numero}
      </div>

      <CaixaTexto texto="MILHÕES DE VOTOS" atraso={28} top={570} tamanho={88} fundo="rgba(43,45,66,0.28)" />

      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        {new Array(colunas * linhas).fill(0).map((_, i) => {
          const c = i % colunas;
          const l = Math.floor(i / colunas);
          const atraso = 18 + random(`p-${i}`) * 55;
          const s = spring({ frame: frame - atraso, fps, config: { damping: 10, stiffness: 140 } });
          const pulo = Math.max(0, Math.sin((frame - atraso) / 7 + i)) * 6;
          return (
            <Pessoa
              key={i}
              x={180 + c * 120 + (l % 2) * 30 - 15}
              y={960 + l * 112 - pulo}
              cor={CORES_PESSOAS[Math.floor(random(`c-${i}`) * CORES_PESSOAS.length)]}
              escala={s}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
