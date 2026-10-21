import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";
import { Juiz } from "../Elementos";

const Balao = ({ x, y, largura, texto, cor, inicio, rabo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 9, stiffness: 160 } });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={rabo} fill={cor} />
      <rect x={-largura / 2} y={-62} width={largura} height={124} rx={62} fill={cor} />
      <text y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={52} fill={SI.branco}>
        {texto}
      </text>
    </g>
  );
};

export const Gancho = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const juiz = spring({ frame, fps, config: { damping: 13 } });
  const duvida = spring({ frame: frame - 150, fps, config: { damping: 7 } });

  return (
    <AbsoluteFill>
      <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-gancho" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <Balao x={400} y={540} largura={600} texto="PRIMO DA PARTE?" cor={SI.imp} inicio={10} rabo="M 60 40 L 140 150 L 150 40 Z" />
        <Balao x={680} y={720} largura={720} texto="AMIGO DO ADVOGADO?" cor={SI.sus} inicio={70} rabo="M -60 40 L -120 140 L -150 40 Z" />
        <g transform={`translate(540 ${interpolate(juiz, [0, 1], [1700, 1260])}) scale(1.25)`}>
          <Juiz expressao="duvida" batidas={[200, 216]} />
        </g>
        {[[-1, 0], [1, 8]].map(([lado, atraso]) => {
          const s = spring({ frame: frame - 150 - atraso, fps, config: { damping: 7 } });
          return (
            <text
              key={lado}
              x={540 + lado * 170}
              y={930 - Math.sin(frame / 8 + lado) * 10}
              textAnchor="middle"
              fontFamily={fontFamily}
              fontWeight={900}
              fontSize={130 * s}
              fill={SI.penal}
            >
              ?
            </text>
          );
        })}
      </svg>
      <div style={{ opacity: duvida }}>
        <CaixaTexto texto="O JUIZ PODE SER AFASTADO?" atraso={150} top={160} tamanho={80} fundo="rgba(242,193,78,0.25)" />
      </div>
    </AbsoluteFill>
  );
};
