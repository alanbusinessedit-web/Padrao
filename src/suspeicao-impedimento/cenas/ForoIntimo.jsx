import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";
import { Juiz } from "../Elementos";

// O juiz põe a mão no peito, diz "me declaro suspeito" e sai da bancada.
export const ForoIntimo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const balao = spring({ frame: frame - 25, fps, config: { damping: 10 } });
  const saida = spring({ frame: frame - 120, fps, config: { damping: 16 } });
  const pulso = 1 + 0.15 * Math.sin(frame / 4);

  return (
    <AbsoluteFill>
      <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-foro" corParticula={SI.sus} />
      <CaixaTexto texto="FORO ÍNTIMO" atraso={4} top={170} tamanho={96} fundo={SI.sus} />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(540 1250) scale(1.25)`}>
          <g transform={`translate(${interpolate(saida, [0, 1], [0, -900])} 0)`}>
            <Juiz mesa={false} />
            <g transform={`translate(-30 -80) scale(${pulso})`}>
              <path d="M 0 30 C -45 0 -38 -38 -15 -35 C -6 -33 0 -26 0 -20 C 0 -26 6 -33 15 -35 C 38 -38 45 0 0 30 Z" fill={SI.imp} />
            </g>
          </g>
          <Juiz mesa batidas={[]} expressao="neutra" />
        </g>
        <g transform={`translate(700 640) scale(${balao * (1 - saida)})`}>
          <path d="M -120 60 L -180 150 L -40 70 Z" fill={SI.branco} />
          <rect x={-300} y={-90} width={600} height={180} rx={50} fill={SI.branco} />
          <text y={-12} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={50} fill={SI.fundo1}>
            ME DECLARO
          </text>
          <text y={50} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={50} fill={SI.sus}>
            SUSPEITO
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
