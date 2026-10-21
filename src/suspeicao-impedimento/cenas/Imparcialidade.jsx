import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";

// Balança que balança e depois se equilibra.
const Balanca = ({ inclinacao }) => (
  <g>
    <rect x={-16} y={-200} width={32} height={380} rx={16} fill={SI.penal} />
    <rect x={-130} y={170} width={260} height={40} rx={20} fill={SI.penal} />
    <circle cy={-214} r={32} fill={SI.penal} />
    <g transform={`rotate(${inclinacao} 0 -180)`}>
      <rect x={-270} y={-194} width={540} height={30} rx={15} fill={SI.penal} />
      {[-230, 230].map((cx) => (
        <g key={cx} transform={`rotate(${-inclinacao} ${cx} -180)`}>
          <line x1={cx} y1={-180} x2={cx - 80} y2={0} stroke={SI.creme} strokeWidth={8} />
          <line x1={cx} y1={-180} x2={cx + 80} y2={0} stroke={SI.creme} strokeWidth={8} />
          <path d={`M ${cx - 105} 0 A 105 70 0 0 0 ${cx + 105} 0 Z`} fill={SI.penal} />
        </g>
      ))}
    </g>
  </g>
);

const Placa = ({ x, y, texto, cor, inicio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 10 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 450,
        height: 130,
        borderRadius: 30,
        background: cor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        fontWeight: 900,
        fontSize: 40,
        color: SI.branco,
        transform: `translateY(${interpolate(s, [0, 1], [-200, 0])}px) scale(${s})`,
        opacity: s,
      }}
    >
      {texto}
    </div>
  );
};

export const Imparcialidade = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 13 } });
  const inclinacao = 14 * Math.sin(frame / 7) * Math.max(0, 1 - frame / 90);

  return (
    <AbsoluteFill>
      <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-imparc" />
      <CaixaTexto texto="IMPARCIALIDADE" atraso={4} top={170} tamanho={88} fundo="rgba(242,193,78,0.25)" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(540 760) scale(${entrada})`}>
          <Balanca inclinacao={inclinacao} />
        </g>
      </svg>
      <Placa x={60} y={1050} texto="PROCESSO CIVIL" cor={SI.civilEscuro} inicio={185} />
      <Placa x={570} y={1050} texto="PROCESSO PENAL" cor="#bc6c25" inicio={200} />
      <Placa x={60} y={1220} texto="IMPEDIMENTO" cor={SI.imp} inicio={238} />
      <Placa x={570} y={1220} texto="SUSPEIÇÃO" cor={SI.sus} inicio={262} />
    </AbsoluteFill>
  );
};
