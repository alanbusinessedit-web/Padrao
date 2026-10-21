import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { IconeComunismo, IconeFascismo, Pessoa } from "../Icones";

// Balão de fala que "explode" na tela e treme.
const Balao = ({ x, y, texto, cor, frame, inicio, fps, ladoRabo }) => {
  const s = spring({ frame: frame - inicio, fps, config: { damping: 8, stiffness: 180 } });
  const tremor = frame > inicio && frame < inicio + 14 ? Math.sin(frame * 3) * 6 : 0;
  const rabo = ladoRabo === "esquerda" ? "M -120 40 L -170 120 L -50 50 Z" : "M 120 40 L 170 120 L 50 50 Z";
  return (
    <g transform={`translate(${x + tremor} ${y}) scale(${s})`}>
      <path d={rabo} fill={cor} />
      <rect x={-260} y={-70} width={520} height={140} rx={70} fill={cor} />
      <text x={0} y={22} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={58} fill={FC.branco}>
        {texto}
      </text>
    </g>
  );
};

export const Gancho = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pessoas = spring({ frame, fps, config: { damping: 13 } });
  // os dois "discutem": inclinam um para o outro
  const discussao = Math.sin(frame / 4) * 3;
  const icones = spring({ frame: frame - 120, fps, config: { damping: 11 } });
  const interrog = spring({ frame: frame - 100, fps, config: { damping: 7 } });

  return (
    <AbsoluteFill>
      <Fundo de={FC.fundo1} para={FC.fundo2} seed="gancho" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <Balao x={320} y={620} texto="FASCISTA!" cor={FC.fas} frame={frame} inicio={6} fps={fps} ladoRabo="esquerda" />
        <Balao x={760} y={840} texto="COMUNISTA!" cor={FC.com} frame={frame} inicio={22} fps={fps} ladoRabo="direita" />

        <g transform={`translate(0 ${interpolate(pessoas, [0, 1], [400, 0])})`}>
          <g transform={`rotate(${discussao} 250 1200)`}>
            <Pessoa x={250} y={1200} escala={4} cor={FC.pele} corRoupa={FC.ciano} />
          </g>
          <g transform={`rotate(${-discussao} 830 1200)`}>
            <Pessoa x={830} y={1200} escala={4} cor={FC.pele} corRoupa={FC.ouro} />
          </g>
        </g>

        <g transform={`translate(540 1110) scale(${interrog})`}>
          <circle r={95} fill={FC.branco} />
          <text y={52} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={150} fill={FC.fundo1}>
            ?
          </text>
        </g>

        <g opacity={icones}>
          <g transform={`translate(250 1400) scale(${0.55 * icones})`}>
            <circle r={150} fill={FC.com} />
            <IconeComunismo />
          </g>
          <g transform={`translate(830 1400) scale(${0.55 * icones})`}>
            <circle r={150} fill={FC.fas} />
            <IconeFascismo />
          </g>
        </g>
      </svg>
      <CaixaTexto texto="VOCÊ SABE DIFERENCIAR?" atraso={95} top={180} tamanho={84} fundo="rgba(242,193,78,0.25)" />
    </AbsoluteFill>
  );
};
