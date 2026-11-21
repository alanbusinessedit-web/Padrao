import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, Notas, brl } from "../Elementos";
import { Caio } from "../Personagens";
import { PC } from "../cores";

const Coroa = () => (
  <g>
    <path d="M -70 0 L -70 -70 L -35 -35 L 0 -90 L 35 -35 L 70 -70 L 70 0 Z" fill="#ffd166" stroke="#c9921a" strokeWidth="8" strokeLinejoin="round" />
    <rect x="-74" y="-4" width="148" height="22" rx="8" fill="#f4b942" stroke="#c9921a" strokeWidth="6" />
    {[-70, 0, 70].map((x) => (
      <circle key={x} cx={x} cy={-76 - (x === 0 ? 14 : 0)} r="10" fill="#ef476f" />
    ))}
  </g>
);

// 5-11,5s: o contraste. Ontem R$ 43,18; hoje R$ 12.847,32; "o cara mais rico do prédio".
// Tempos dos balões acompanham a narração (HOJE entra em ~2,8 s, a coroa em ~4,3 s).
export const T_HOJE = 84;
export const T_COROA = 130;

export const Contexto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ontem = spring({ frame: frame - 6, fps, config: { damping: 11 } });
  const hoje = spring({ frame: frame - T_HOJE, fps, config: { damping: 9, stiffness: 140 } });
  const coroa = spring({ frame: frame - T_COROA, fps, config: { damping: 7, stiffness: 150 } });
  const valor = interpolate(frame, [T_HOJE + 4, T_HOJE + 40], [43.18, 12847.32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const caio = spring({ frame, fps, config: { damping: 13 } });
  const rico = frame >= T_COROA;

  return (
    <AbsoluteFill>
      <Apartamento />
      {rico && <Notas quantidade={12} inicio={T_COROA} seed="rico" />}
      <div style={{ position: "absolute", left: 90, right: 90, top: 250, height: 250, borderRadius: 48, background: "#eef0f6", boxShadow: "0 24px 50px rgba(0,0,0,0.3)", fontFamily, textAlign: "center", transform: `scale(${ontem})`, opacity: ontem, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
        <div style={{ fontWeight: 900, fontSize: 40, letterSpacing: 6, color: "#6b7390" }}>ONTEM</div>
        <div style={{ fontWeight: 900, fontSize: 96, color: PC.alertaEscuro, letterSpacing: -2 }}>{brl(43.18)}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 520, textAlign: "center", fontFamily, fontWeight: 900, fontSize: 90, color: PC.pix, opacity: hoje, transform: `translateY(${interpolate(hoje, [0, 1], [-30, 0])}px)` }}>▼</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 620, height: 290, borderRadius: 54, background: `linear-gradient(160deg, ${PC.pix}, ${PC.pixEscuro})`, boxShadow: "0 30px 60px rgba(0,0,0,0.4)", fontFamily, textAlign: "center", transform: `scale(${hoje})`, opacity: hoje, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
        <div style={{ fontWeight: 900, fontSize: 40, letterSpacing: 6, color: "#073b27" }}>HOJE</div>
        <div style={{ fontWeight: 900, fontSize: 112, color: "#fff", letterSpacing: -3 }}>{brl(valor)}</div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(540 ${interpolate(caio, [0, 1], [1900, 1530])}) scale(0.85)`}>
          <Caio boca={rico ? "sorriso" : "tensa"} sobrancelha={rico ? "choque" : "estresse"} pupilas={rico ? [0, -0.4] : [0, 0.9]} celular={!rico} tremor={rico ? 0 : 0.6} />
          <g transform={`translate(0 -520) scale(${coroa}) rotate(${interpolate(coroa, [0, 1], [-30, 0])})`}>
            <Coroa />
          </g>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 928, display: "flex", justifyContent: "center", transform: `scale(${coroa})`, opacity: coroa }}>
        <div style={{ fontFamily, fontWeight: 900, fontSize: 46, color: "#4a3500", background: PC.amarelo, borderRadius: 999, padding: "10px 40px", boxShadow: "0 8px 0 #c9921a" }}>O CARA MAIS RICO DO PRÉDIO</div>
      </div>
    </AbsoluteFill>
  );
};
