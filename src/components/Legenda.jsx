import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";

// Legenda dinâmica no rodapé: as palavras são destacadas ao longo da cena,
// acompanhando a narração. `inicio`/`fim` em frames relativos à cena.
export const Legenda = ({ texto, inicio = 6, fim }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fimFala = fim ?? durationInFrames - 12;

  const palavras = texto.split(" ");
  const progresso = interpolate(frame, [inicio, fimFala], [0, palavras.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacidade = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "center",
        opacity: opacidade,
      }}
    >
      <div
        style={{
          background: "rgba(10, 12, 30, 0.55)",
          borderRadius: 28,
          padding: "26px 34px",
          textAlign: "center",
          fontFamily,
          fontWeight: 800,
          fontSize: 50,
          lineHeight: 1.3,
        }}
      >
        {palavras.map((palavra, i) => {
          const ativa = progresso > i;
          const atual = progresso > i && progresso < i + 1;
          return (
            <span
              key={i}
              style={{
                color: atual ? "#ffd166" : "#ffffff",
                opacity: ativa ? 1 : 0.35,
                display: "inline-block",
                transform: `scale(${atual ? 1.08 : 1})`,
                marginRight: 14,
              }}
            >
              {palavra}
            </span>
          );
        })}
      </div>
    </div>
  );
};
