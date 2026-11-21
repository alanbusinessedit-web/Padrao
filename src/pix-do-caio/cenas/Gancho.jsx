import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, Notas, brl } from "../Elementos";
import { Caio } from "../Personagens";
import { VALOR_PIX } from "../valor";
import { PC } from "../cores";

// Hook (0-6s): Caio de boca aberta olhando o celular. Número gigante: R$ 460.847,32.
export const Gancho = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 9, stiffness: 140 } });
  const caio = spring({ frame, fps, config: { damping: 12 } });
  const valor = interpolate(frame, [10, 55], [0, VALOR_PIX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = 1 + frame * 0.0006;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "50% 60%" }}>
        <Apartamento />
        <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
          <g transform={`translate(540 ${interpolate(caio, [0, 1], [1700, 1300])}) scale(1.05)`}>
            <Caio boca="aberta" sobrancelha="choque" pupilas={[0.7, 0.8]} tela={PC.pix} tremor={1.2} />
          </g>
        </svg>
      </div>
      <Notas quantidade={16} inicio={30} seed="gancho" />
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${pop})`,
          opacity: Math.min(1, pop * 1.5),
        }}
      >
        <div style={{ background: "rgba(18,20,42,0.92)", borderRadius: 48, padding: "26px 52px 34px", textAlign: "center", border: `5px solid ${PC.pix}`, boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
          <div style={{ fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: 6, color: PC.pix }}>PIX RECEBIDO</div>
          <div style={{ fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 1.1, color: PC.branco, letterSpacing: -2 }}>{brl(valor)}</div>
          <div style={{ fontFamily, fontWeight: 800, fontSize: 36, color: PC.amarelo, marginTop: 6 }}>DE UM NÚMERO DESCONHECIDO</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
