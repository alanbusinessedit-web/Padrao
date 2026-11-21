import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, brl, digitar } from "../Elementos";
import { Caio, Mae as MaeSvg } from "../Personagens";
import { PC } from "../cores";

// A mãe liga (voz alta): a luz vence hoje (R$ 187) e o aluguel está atrasado (R$ 1.200).
// Os tempos (frames) casam com a voz da mãe, que começa em 1,2 s (frame 36).
const FALA = "Caio! A conta de luz vence hoje: faltam R$ 187. E o aluguel tá atrasado: R$ 1.200! Você tem como pagar?";
export const INICIO_FALA = 36;
export const DURACAO_FALA = 246; // frames da voz da mãe
export const T_LUZ = 70; // "conta de luz vence hoje"
export const T_CARIMBO_LUZ = 88;
export const T_ALUGUEL = 170; // "o aluguel tá atrasado"
export const T_CARIMBO_ALUGUEL = 200;
export const T_TOTAL = 248; // "... você tem como pagar?"

const Casa = () => (
  <svg width="54" height="54" viewBox="-30 -30 60 60">
    <path d="M -26 0 L 0 -24 L 26 0 L 20 0 L 20 22 L -20 22 L -20 0 Z" fill="#4cc9f0" stroke="#277da1" strokeWidth="4" strokeLinejoin="round" />
    <rect x="-6" y="6" width="12" height="16" fill="#277da1" />
  </svg>
);

const Linha = ({ icone, nome, valor, carimbo, entrada, tCarimbo, frame, fps }) => {
  const s = spring({ frame: frame - entrada, fps, config: { damping: 12 } });
  const c = spring({ frame: frame - tCarimbo, fps, config: { damping: 7, stiffness: 220 } });
  return (
    <div style={{ position: "relative", padding: "14px 22px", borderBottom: "3px dashed #d8d4c4", transform: `translateX(${interpolate(s, [0, 1], [420, 0])}px)`, opacity: s }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 900, fontSize: 30, color: "#6b6b6b", letterSpacing: 2 }}>
        {icone}
        {nome}
      </div>
      <div style={{ fontWeight: 900, fontSize: 50, color: PC.tinta, letterSpacing: -1, whiteSpace: "nowrap" }}>{valor}</div>
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 8,
          border: `6px solid ${PC.alerta}`,
          color: PC.alerta,
          fontWeight: 900,
          fontSize: 25,
          padding: "0 10px",
          borderRadius: 10,
          background: "rgba(255,253,244,0.9)",
          transform: `rotate(-10deg) scale(${interpolate(c, [0, 1], [2.4, 1])})`,
          opacity: c,
        }}
      >
        {carimbo}
      </div>
    </div>
  );
};

export const Mae = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chamada = spring({ frame, fps, config: { damping: 10 } });
  const toca = frame < 40;
  const balanca = toca ? Math.sin(frame * 1.6) * 5 : 0;
  const bolha = spring({ frame: frame - INICIO_FALA, fps, config: { damping: 12 } });
  const falando = frame > INICIO_FALA && frame < INICIO_FALA + DURACAO_FALA;
  const cartao = spring({ frame: frame - T_LUZ + 6, fps, config: { damping: 11 } });
  const total = spring({ frame: frame - T_TOTAL, fps, config: { damping: 9, stiffness: 160 } });
  const olhaConta = frame > T_LUZ;

  return (
    <AbsoluteFill>
      <Apartamento />
      {/* ligação da mãe */}
      <div style={{ position: "absolute", left: 50, top: 250, width: 400, height: 400, transform: `scale(${chamada}) rotate(${balanca}deg)` }}>
        <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: `10px solid ${PC.pix}`, opacity: toca ? 0.4 + 0.6 * Math.abs(Math.sin(frame / 5)) : 1 }} />
        <svg viewBox="-210 -210 420 420" width="400" height="400" style={{ borderRadius: "50%", background: "#ffd9a0", overflow: "hidden" }}>
          <g transform="translate(0 0) scale(0.78)">
            <MaeSvg fala={falando} nervosa />
          </g>
        </svg>
        <div style={{ position: "absolute", left: "50%", bottom: -34, transform: "translateX(-50%)", background: PC.pix, color: "#073b27", fontFamily, fontWeight: 900, fontSize: 40, padding: "8px 34px", borderRadius: 999, whiteSpace: "nowrap" }}>
          {toca ? "MÃE LIGANDO…" : "MÃE"}
        </div>
      </div>
      {/* contas em atraso */}
      <div
        style={{
          position: "absolute",
          left: 500,
          top: 230,
          width: 540,
          borderRadius: 26,
          background: "#fffdf4",
          transform: `rotate(${interpolate(cartao, [0, 1], [14, 3])}deg) scale(${cartao})`,
          opacity: cartao,
          boxShadow: "0 26px 50px rgba(0,0,0,0.3)",
          overflow: "hidden",
          fontFamily,
        }}
      >
        <div style={{ background: PC.amarelo, padding: "12px 22px", fontWeight: 900, fontSize: 34, color: "#4a3500" }}>CONTAS EM ATRASO</div>
        <Linha icone={<span style={{ fontSize: 34 }}>⚡</span>} nome="LUZ" valor={brl(187)} carimbo="VENCE HOJE" entrada={T_LUZ} tCarimbo={T_CARIMBO_LUZ} frame={frame} fps={fps} />
        <Linha icone={<Casa />} nome="ALUGUEL" valor={brl(1200)} carimbo="ATRASADO" entrada={T_ALUGUEL} tCarimbo={T_CARIMBO_ALUGUEL} frame={frame} fps={fps} />
        <div style={{ background: PC.hud, color: "#fff", padding: "14px 22px", fontWeight: 900, fontSize: 34, display: "flex", justifyContent: "space-between", alignItems: "center", transform: `scaleY(${total})`, transformOrigin: "top", opacity: total }}>
          <span style={{ letterSpacing: 3, fontSize: 28 }}>TOTAL</span>
          <span style={{ color: PC.amarelo, fontSize: 46 }}>{brl(1387)}</span>
        </div>
      </div>
      {/* balão da mãe */}
      <div
        style={{
          position: "absolute",
          left: 50,
          right: 50,
          top: 830,
          minHeight: 330,
          background: "#fff",
          borderRadius: 52,
          padding: "30px 40px",
          fontFamily,
          fontWeight: 900,
          fontSize: 48,
          lineHeight: 1.2,
          color: PC.tinta,
          transform: `scale(${bolha})`,
          transformOrigin: "30% 0",
          opacity: bolha,
          boxShadow: "0 24px 50px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ position: "absolute", top: -34, left: 150, width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderBottom: "40px solid #fff" }} />
        {digitar(FALA, frame, INICIO_FALA, FALA.length / DURACAO_FALA)}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(540 1730) scale(0.72)">
          <Caio boca="tensa" sobrancelha="estresse" pupilas={olhaConta ? [-0.5, -0.8] : [0.3, 0.1]} tela={PC.pix} tremor={toca ? 3 : 0.6} suor={!toca} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
