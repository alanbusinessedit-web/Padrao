import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";

// Caixa de título moderna: entra com mola, letras sobem uma a uma.
export const CaixaTexto = ({ texto, cor = "#ffffff", fundo = "rgba(255,255,255,0.14)", atraso = 0, tamanho = 96, top = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({ frame: frame - atraso, fps, config: { damping: 14, stiffness: 120 } });
  const largura = interpolate(entrada, [0, 1], [0.4, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: fundo,
          borderRadius: 36,
          padding: "34px 48px",
          transform: `scale(${largura})`,
          opacity: entrada,
          maxWidth: 960,
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: tamanho,
            lineHeight: 1.05,
            letterSpacing: 2,
            color: cor,
          }}
        >
          {texto.split(" ").map((palavra, w, palavras) => {
            // índice da primeira letra desta palavra no texto inteiro (para o atraso)
            const base = palavras.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
            return (
              <span key={w} style={{ display: "inline-block", whiteSpace: "nowrap", margin: "0 0.16em" }}>
                {palavra.split("").map((letra, i) => {
                  const p = spring({ frame: frame - atraso - 4 - (base + i) * 1.2, fps, config: { damping: 12 } });
                  return (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        opacity: p,
                        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
                      }}
                    >
                      {letra}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
