import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { Pessoa } from "../../fascismo-comunismo/Icones";
import { SI } from "../cores";
import { Juiz, SeloLei } from "../Elementos";

// Uma parte provoca o juiz de propósito; depois aparece o carimbo "NÃO VALE".
export const Pegadinha = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const balao = spring({ frame: frame - 25, fps, config: { damping: 8, stiffness: 170 } });
  const carimbo = spring({ frame: frame - 135, fps, config: { damping: 9, stiffness: 200 } });
  const tremor = frame > 25 && frame < 120 ? Math.sin(frame * 2.3) * 5 : 0;

  return (
    <AbsoluteFill>
      <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-peg" corParticula={SI.penal} />
      <CaixaTexto texto="ATENÇÃO!" atraso={4} top={170} tamanho={100} cor={SI.fundo1} fundo={SI.penal} />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform="translate(720 1150) scale(0.95)">
          <Juiz expressao="duvida" />
        </g>
        <g transform={`translate(${tremor} 0)`}>
          <Pessoa x={220} y={1180} escala={3.4} cor={SI.pele} corRoupa={SI.civilEscuro} />
        </g>
        <g transform={`translate(300 690) scale(${balao})`}>
          <path d="M -40 60 L -80 170 L 40 70 Z" fill={SI.branco} />
          <rect x={-200} y={-80} width={400} height={160} rx={60} fill={SI.branco} />
          <text y={30} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={90} fill={SI.imp}>
            #@!%
          </text>
        </g>
        <g transform={`translate(540 960) rotate(-12) scale(${interpolate(carimbo, [0, 1], [2.5, 1])})`} opacity={carimbo}>
          <rect x={-330} y={-100} width={660} height={200} rx={30} fill="none" stroke={SI.imp} strokeWidth={20} />
          <text y={42} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={120} fill={SI.imp}>
            NÃO VALE
          </text>
        </g>
      </svg>
      <SeloLei codigo="CPC" artigo="art. 145, §2º" cor={SI.civil} x={60} y={1390} inicio={190} />
      <SeloLei codigo="CPP" artigo="art. 256" cor={SI.penal} x={620} y={1390} inicio={205} />
    </AbsoluteFill>
  );
};
