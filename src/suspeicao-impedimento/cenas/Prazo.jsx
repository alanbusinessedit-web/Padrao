import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { Painel } from "../../components/Painel";
import { SI } from "../cores";

// Calendário com a contagem regressiva de 15 dias.
const Calendario = () => {
  const frame = useCurrentFrame();
  const dias = Math.round(interpolate(frame, [40, 200], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <g transform="translate(180 200)">
      <rect x={-130} y={-120} width={260} height={250} rx={28} fill={SI.branco} />
      <rect x={-130} y={-120} width={260} height={70} rx={28} fill={SI.imp} />
      <rect x={-130} y={-80} width={260} height={30} fill={SI.imp} />
      {[-70, 70].map((x) => (
        <rect key={x} x={x - 10} y={-150} width={20} height={56} rx={10} fill={SI.toga} />
      ))}
      <text y={85} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={130} fill={SI.fundo1}>
        {dias}
      </text>
    </g>
  );
};

// Pódio com o "1": primeira oportunidade.
const PrimeiraOportunidade = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 245, fps, config: { damping: 9 } });
  return (
    <g>
      <rect x={30} y={250} width={100} height={90} rx={10} fill="#8a4f1b" />
      <rect x={230} y={270} width={100} height={70} rx={10} fill="#8a4f1b" />
      <rect x={130} y={190} width={100} height={150} rx={10} fill={SI.penal} />
      <g transform={`translate(180 ${interpolate(s, [0, 1], [190, 110])}) scale(${s})`}>
        <circle r={62} fill={SI.branco} />
        <text y={34} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={96} fill="#bc6c25">
          1
        </text>
      </g>
    </g>
  );
};

export const Prazo = () => (
  <AbsoluteFill>
    <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-prazo" />
    <CaixaTexto texto="COMO ALEGAR" atraso={4} top={170} tamanho={92} fundo="rgba(255,255,255,0.12)" />
    <Painel
      top={400}
      rotulo="PROCESSO CIVIL"
      cor={SI.civilEscuro}
      corEscura="#1d5f7a"
      atraso={30}
      de="esquerda"
      titulo="15 DIAS"
      texto="contados de quando a parte soube do fato (CPC, art. 146)"
    >
      <Calendario />
    </Painel>
    <Painel
      top={960}
      rotulo="PROCESSO PENAL"
      cor="#bc6c25"
      corEscura="#8a4f1b"
      atraso={225}
      de="direita"
      titulo="1ª OPORTUNIDADE"
      texto="antes de qualquer outra exceção (CPP, art. 96)"
    >
      <PrimeiraOportunidade />
    </Painel>
  </AbsoluteFill>
);
