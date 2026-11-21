import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, brl, digitar } from "../Elementos";
import { Caio, Mae as MaeSvg } from "../Personagens";
import { PC } from "../cores";

// 15-28s: a mãe liga (voz alta) e lembra da conta de luz: faltam R$ 187.
const FALA = "Caio, a conta de luz vence hoje. Tá faltando R$ 187. Você tem como pagar?";

export const Mae = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chamada = spring({ frame, fps, config: { damping: 10 } });
  const toca = frame < 40;
  const balanca = toca ? Math.sin(frame * 1.6) * 5 : 0;
  const bolha = spring({ frame: frame - 36, fps, config: { damping: 12 } });
  const falando = frame > 36 && frame < 36 + 172;
  const conta = spring({ frame: frame - 63, fps, config: { damping: 9, stiffness: 150 } });
  const carimbo = spring({ frame: frame - 90, fps, config: { damping: 7, stiffness: 220 } });

  return (
    <AbsoluteFill>
      <Apartamento />
      {/* ligação da mãe */}
      <div style={{ position: "absolute", left: 70, top: 250, width: 420, height: 420, transform: `scale(${chamada}) rotate(${balanca}deg)` }}>
        <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: `10px solid ${PC.pix}`, opacity: toca ? 0.4 + 0.6 * Math.abs(Math.sin(frame / 5)) : 1 }} />
        <svg viewBox="-210 -210 420 420" width="420" height="420" style={{ borderRadius: "50%", background: "#ffd9a0", overflow: "hidden" }}>
          <g transform="translate(0 0) scale(0.78)">
            <MaeSvg fala={falando} nervosa />
          </g>
        </svg>
        <div style={{ position: "absolute", left: "50%", bottom: -34, transform: "translateX(-50%)", background: PC.pix, color: "#073b27", fontFamily, fontWeight: 900, fontSize: 40, padding: "8px 34px", borderRadius: 999, whiteSpace: "nowrap" }}>
          {toca ? "MÃE LIGANDO…" : "MÃE"}
        </div>
      </div>
      {/* conta de luz */}
      <div
        style={{
          position: "absolute",
          left: 590,
          top: 270,
          width: 410,
          height: 440,
          borderRadius: 24,
          background: "#fffdf4",
          transform: `rotate(${interpolate(conta, [0, 1], [18, 5])}deg) scale(${conta})`,
          opacity: conta,
          boxShadow: "0 26px 50px rgba(0,0,0,0.3)",
          overflow: "hidden",
          fontFamily,
        }}
      >
        <div style={{ background: PC.amarelo, padding: "16px 24px", fontWeight: 900, fontSize: 36, color: "#4a3500" }}>⚡ CONTA DE LUZ</div>
        <div style={{ padding: "22px 24px 0" }}>
          <div style={{ fontWeight: 800, fontSize: 28, color: "#7a7a7a" }}>VALOR EM ABERTO</div>
          <div style={{ fontWeight: 900, fontSize: 66, whiteSpace: "nowrap", color: "#1b1b2f", letterSpacing: -2 }}>{brl(187)}</div>
          <div style={{ display: "flex", gap: 5, marginTop: 14, height: 54 }}>
            {[...Array(30)].map((_, i) => (
              <div key={i} style={{ flex: i % 3 === 0 ? 2 : 1, background: "#1b1b2f", opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 20,
            bottom: 30,
            border: `8px solid ${PC.alerta}`,
            color: PC.alerta,
            fontWeight: 900,
            fontSize: 46,
            padding: "4px 18px",
            borderRadius: 12,
            transform: `rotate(-12deg) scale(${interpolate(carimbo, [0, 1], [2.4, 1])})`,
            opacity: carimbo,
          }}
        >
          VENCE HOJE
        </div>
      </div>
      {/* balão da mãe */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 800,
          minHeight: 270,
          background: "#fff",
          borderRadius: 52,
          padding: "34px 44px",
          fontFamily,
          fontWeight: 900,
          fontSize: 54,
          lineHeight: 1.2,
          color: PC.tinta,
          transform: `scale(${bolha})`,
          transformOrigin: "30% 0",
          opacity: bolha,
          boxShadow: "0 24px 50px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ position: "absolute", top: -34, left: 150, width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderBottom: "40px solid #fff" }} />
        {digitar(FALA, frame, 36, 0.44)}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(540 1680) scale(0.8)">
          <Caio boca="tensa" sobrancelha="estresse" pupilas={conta > 0.5 ? [-0.5, -0.8] : [0.3, 0.1]} tela={PC.pix} tremor={toca ? 3 : 0.6} suor={!toca} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
