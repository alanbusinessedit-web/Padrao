import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { PC } from "../cores";

const Opcao = ({ letra, titulo, risco, cor, escuro, top, inicio, destaque }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 11, stiffness: 140 } });
  const pulso = 1 + 0.018 * Math.sin(frame / 7 + destaque);
  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top,
        height: 360,
        borderRadius: 60,
        background: cor,
        boxShadow: `0 14px 0 ${escuro}, 0 40px 70px rgba(0,0,0,0.4)`,
        display: "flex",
        alignItems: "center",
        gap: 36,
        padding: "0 44px",
        transform: `translateX(${interpolate(s, [0, 1], [destaque ? 1200 : -1200, 0])}px) scale(${pulso})`,
        fontFamily,
      }}
    >
      <div style={{ width: 190, height: 190, borderRadius: 95, background: "#fff", color: escuro, fontWeight: 900, fontSize: 150, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{letra}</div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 70, lineHeight: 1.05, color: "#fff" }}>{titulo}</div>
        <div style={{ marginTop: 18, fontWeight: 800, fontSize: 36, lineHeight: 1.2, color: "rgba(255,255,255,0.92)", background: "rgba(0,0,0,0.25)", padding: "8px 20px", borderRadius: 20, display: "inline-block" }}>⚠ {risco}</div>
      </div>
    </div>
  );
};

// 47-61s: voto binário. A ou B é o CTA.
export const Voto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cta = spring({ frame: frame - 160, fps, config: { damping: 9, stiffness: 160 } });
  const dia = spring({ frame: frame - 205, fps, config: { damping: 9, stiffness: 160 } });
  return (
    <AbsoluteFill>
      <Fundo de={PC.hud} para="#2a1f5a" seed="voto" corParticula={PC.pix} />
      <CaixaTexto texto="VOCÊ DECIDE" top={230} tamanho={84} fundo="rgba(255,255,255,0.12)" />
      <Opcao letra="A" titulo="PAGA O ALUGUEL E A LUZ" risco="o remetente pode perceber" cor={PC.azulEscuro} escuro="#124666" top={450} inicio={48} destaque={0} />
      <Opcao letra="B" titulo="NÃO MEXE NO DINHEIRO" risco="aluguel atrasa e a luz é cortada" cor={PC.laranjaEscuro} escuro="#7a420a" top={850} inicio={106} destaque={1} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1280, display: "flex", justifyContent: "center", transform: `scale(${cta})`, opacity: cta }}>
        <div style={{ fontFamily, fontWeight: 900, fontSize: 76, color: "#073b27", background: PC.pix, borderRadius: 999, padding: "18px 64px", boxShadow: "0 12px 0 #0f9d66" }}>COMENTA A OU B</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1440, textAlign: "center", fontFamily, fontWeight: 900, fontSize: 56, color: PC.amarelo, transform: `scale(${dia})`, opacity: dia }}>
        A MAIORIA DECIDE O DIA 6
      </div>
    </AbsoluteFill>
  );
};
