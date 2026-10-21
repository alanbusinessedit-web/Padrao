import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";

// Painel de comparação: rótulo (COMUNISMO/FASCISMO), ilustração em SVG à
// esquerda (viewBox 360x380) e título + texto à direita. Entra deslizando.
export const Painel = ({ top, rotulo, cor, corEscura, atraso = 0, de = "esquerda", titulo, texto, children, altura = 520 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame: frame - atraso, fps, config: { damping: 15 } });
  const desloc = interpolate(entrada, [0, 1], [de === "esquerda" ? -1100 : 1100, 0]);
  // títulos com palavras longas (ex.: INTERNACIONALISTA) ganham fonte menor
  const maiorPalavra = Math.max(...titulo.split(" ").map((p) => p.length));
  const tamanhoTitulo = maiorPalavra > 14 ? 38 : maiorPalavra > 11 ? 46 : 52;
  const textoEntra = spring({ frame: frame - atraso - 12, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 50,
        width: 980,
        height: altura,
        borderRadius: 44,
        background: cor,
        transform: `translateX(${desloc}px)`,
        boxShadow: `0 16px 0 ${corEscura}`,
        overflow: "hidden",
        fontFamily,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 30,
          background: corEscura,
          color: "#fff",
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: 3,
          padding: "10px 24px",
          borderRadius: 999,
        }}
      >
        {rotulo}
      </div>
      <svg viewBox="0 0 360 380" width={380} height={altura - 100} style={{ position: "absolute", left: 20, top: 90 }}>
        {children}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 420,
          right: 40,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: textoEntra,
          transform: `translateY(${interpolate(textoEntra, [0, 1], [30, 0])}px)`,
          color: "#fff",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: tamanhoTitulo, lineHeight: 1.05 }}>{titulo}</div>
        <div style={{ fontWeight: 600, fontSize: 34, lineHeight: 1.25, marginTop: 18, opacity: 0.92 }}>{texto}</div>
      </div>
    </div>
  );
};
