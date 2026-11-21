import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, digitar } from "../Elementos";
import { Caio, Sombra } from "../Personagens";
import { PC } from "../cores";

// 36-47s: TWIST. Chega outra notificação do mesmo número; uma sombra aparece na janela.
export const Twist = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const banner = spring({ frame: frame - 70, fps, config: { damping: 8, stiffness: 180 } });
  const vibra = frame > 70 && frame < 100 ? Math.sin(frame * 3.1) * 9 : 0;
  const sombra = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const caio = spring({ frame, fps, config: { damping: 13 } });
  const vinheta = frame > 70 ? 0.18 + 0.12 * Math.sin(frame / 5) : 0;
  const FALA = "Eu sei que você viu. Não inventa de pagar conta com o meu dinheiro.";
  const texto = digitar(FALA, frame, 80, 0.75);

  return (
    <AbsoluteFill>
      <Apartamento clima="tenso" sombra={<Sombra opacidade={sombra} />} />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(700 ${interpolate(caio, [0, 1], [1800, 1330])}) scale(1)`}>
          <Caio boca="aberta" sobrancelha="choque" pupilas={[-0.8, -0.2]} tela={PC.alerta} tremor={frame > 70 ? 3 : 1} suor />
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle, transparent 40%, rgba(255,40,70,${vinheta}) 100%)` }} />
      <div
        style={{
          position: "absolute",
          left: 50,
          right: 50,
          top: 250,
          transform: `translate(${vibra}px, ${interpolate(banner, [0, 1], [-400, 0])}px)`,
          opacity: Math.min(1, banner * 2),
          background: "rgba(12,14,34,0.96)",
          border: `6px solid ${PC.alerta}`,
          borderRadius: 52,
          padding: "30px 40px 40px",
          fontFamily,
          boxShadow: `0 0 70px rgba(255,77,94,0.55)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 34, letterSpacing: 3, color: PC.alerta }}>⚠ MESMO NÚMERO</div>
          <div style={{ fontWeight: 700, fontSize: 28, color: "#8b93b8" }}>agora</div>
        </div>
        <div style={{ marginTop: 18, fontWeight: 900, fontSize: 60, lineHeight: 1.2, color: PC.branco, minHeight: 250 }}>
          “{texto}
          {texto.length < FALA.length ? <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>|</span> : "”"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
