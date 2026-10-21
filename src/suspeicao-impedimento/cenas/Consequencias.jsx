import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { Painel } from "../../components/Painel";
import { SI } from "../cores";

// Sentença "definitiva" que se rasga ao meio (ação rescisória).
const SentencaRasgada = () => {
  const frame = useCurrentFrame();
  const rasgo = interpolate(frame, [270, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const metade = (lado) => (
    <g transform={`translate(${lado * 40 * rasgo} ${20 * rasgo}) rotate(${lado * 10 * rasgo} 180 330)`}>
      <g clipPath={`url(#metade-${lado > 0 ? "d" : "e"})`}>
        <rect x={70} y={30} width={220} height={300} rx={14} fill={SI.branco} />
        <text x={180} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={30} fill={SI.fundo1}>
          SENTENÇA
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={100} y={120 + i * 32} width={160 - (i % 2) * 40} height={14} rx={7} fill="#ced4da" />
        ))}
        <circle cx={230} cy={290} r={26} fill="none" stroke={SI.verde} strokeWidth={6} />
      </g>
    </g>
  );
  return (
    <g>
      <defs>
        <clipPath id="metade-e">
          <path d="M 0 0 L 190 0 L 170 80 L 200 160 L 165 240 L 195 400 L 0 400 Z" />
        </clipPath>
        <clipPath id="metade-d">
          <path d="M 190 0 L 400 0 L 400 400 L 195 400 L 165 240 L 200 160 L 170 80 Z" />
        </clipPath>
      </defs>
      {metade(-1)}
      {metade(1)}
    </g>
  );
};

// Ampulheta e cadeado que se fecha (preclusão).
const CadeadoPrazo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const areia = interpolate(frame, [360, 430], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fecha = spring({ frame: frame - 435, fps, config: { damping: 9, stiffness: 200 } });
  return (
    <g>
      <g transform="translate(110 190)">
        <rect x={-70} y={-130} width={140} height={20} rx={10} fill={SI.penal} />
        <rect x={-70} y={110} width={140} height={20} rx={10} fill={SI.penal} />
        <path d="M -55 -110 L 55 -110 L 8 0 L 55 110 L -55 110 L -8 0 Z" fill={SI.creme} />
        <path d={`M ${-45 + areia * 37} ${-95 + areia * 85} L ${45 - areia * 37} ${-95 + areia * 85} L 0 0 Z`} fill={SI.penal} />
        <path d={`M -45 105 L 45 105 L ${45 - (1 - areia) * 40} ${105 - areia * 80} L ${-45 + (1 - areia) * 40} ${105 - areia * 80} Z`} fill={SI.penal} />
      </g>
      <g transform="translate(270 200)">
        <path
          d="M -50 0 L -50 -50 A 50 50 0 0 1 50 -50 L 50 0"
          stroke="#ced4da"
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
          transform={`translate(0 ${interpolate(fecha, [0, 1], [-40, 0])})`}
        />
        <rect x={-80} y={-10} width={160} height={130} rx={24} fill={SI.penal} />
        <circle cy={45} r={18} fill={SI.fundo1} />
      </g>
    </g>
  );
};

export const Consequencias = () => (
  <AbsoluteFill>
    <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-cons" />
    <CaixaTexto texto="A GRANDE DIFERENÇA" atraso={4} top={170} tamanho={80} fundo="rgba(242,193,78,0.25)" />
    <Painel
      top={400}
      rotulo="IMPEDIMENTO"
      cor={SI.imp}
      corEscura={SI.impEscuro}
      atraso={70}
      de="esquerda"
      titulo="VÍCIO GRAVÍSSIMO"
      texto="Reconhecido a qualquer tempo. No civil, cabe ação rescisória (CPC, art. 966, II)"
    >
      <SentencaRasgada />
    </Painel>
    <Painel
      top={960}
      rotulo="SUSPEIÇÃO"
      cor={SI.sus}
      corEscura={SI.susEscuro}
      atraso={350}
      de="direita"
      titulo="PERDEU O MOMENTO?"
      texto="Se não for alegada a tempo, não pode mais ser discutida"
    >
      <CadeadoPrazo />
    </Painel>
  </AbsoluteFill>
);
