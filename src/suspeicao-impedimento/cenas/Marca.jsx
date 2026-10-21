import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MARCA, Nome, Simbolo } from "../../marca/Logo";

// Encerramento com a logo animada (sem narração).
export const Marca = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const simbolo = spring({ frame: frame - 4, fps, config: { damping: 10 } });
  const nome = spring({ frame: frame - 18, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 42%, ${MARCA.azul2}, ${MARCA.azul1})` }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%">
        <g transform={`translate(520 820) scale(${0.9 * simbolo}) rotate(${interpolate(simbolo, [0, 1], [-20, 0])})`}>
          <Simbolo />
        </g>
        <g opacity={nome} transform={`translate(0 ${interpolate(nome, [0, 1], [60, 0])})`}>
          <Nome x={540} y={1260} tamanho={124} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
