import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, Celular, brl } from "../Elementos";
import { Caio } from "../Personagens";
import { VALOR_PIX } from "../valor";
import { PC } from "../cores";

// 18,7-25,7s: Caio liga pro número (caixa postal) e tenta devolver o PIX (o app recusa).
// Tempos casados com a narração: caixa postal ~1,4 s, troca pro app ~2,3 s, toque em
// "devolver" ~3,2 s, erro ~3,8 s, "por sete dias" ~5,5 s.
const Ligando = ({ frame }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#232a4d,#10142b)", fontFamily, color: "#fff", textAlign: "center", paddingTop: 150 }}>
    <div style={{ width: 200, height: 200, borderRadius: 100, background: "#3a4272", margin: "0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 120, color: "#9aa3d6" }}>
      ?
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 14) % 42) / 42;
        return <div key={i} style={{ position: "absolute", inset: -t * 90, borderRadius: "50%", border: "6px solid rgba(46,229,157,0.7)", opacity: 1 - t }} />;
      })}
    </div>
    <div style={{ marginTop: 56, fontWeight: 900, fontSize: 46 }}>Número desconhecido</div>
    <div style={{ marginTop: 14, fontWeight: 700, fontSize: 34, color: "#9aa3d6" }}>+55 •• •••••-••••</div>
    <div style={{ marginTop: 50, fontWeight: 900, fontSize: 42, letterSpacing: 3, color: frame < 42 ? "#9aa3d6" : PC.amarelo }}>{frame < 42 ? "CHAMANDO…" : "CAIXA POSTAL"}</div>
    <div style={{ position: "absolute", bottom: 90, left: "50%", marginLeft: -60, width: 120, height: 120, borderRadius: 60, background: PC.alerta, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 900 }}>✕</div>
  </div>
);

const App = ({ frame }) => {
  const { fps } = useVideoConfig();
  const toque = spring({ frame: frame - 96, fps, config: { damping: 12, stiffness: 300 } });
  const erro = spring({ frame: frame - 114, fps, config: { damping: 9, stiffness: 160 } });
  const bloqueado = spring({ frame: frame - 165, fps, config: { damping: 8, stiffness: 150 } });
  return (
    <div style={{ position: "absolute", inset: 0, background: "#eef1f7", fontFamily, padding: "86px 28px 0" }}>
      <div style={{ fontWeight: 800, fontSize: 28, color: "#6b7390", letterSpacing: 2 }}>BANCO • PIX RECEBIDO</div>
      <div style={{ marginTop: 20, background: "#fff", borderRadius: 34, padding: "28px 30px", boxShadow: "0 16px 34px rgba(20,30,70,0.15)" }}>
        <div style={{ fontWeight: 900, fontSize: 58, color: PC.pixEscuro, letterSpacing: -1 }}>{brl(VALOR_PIX)}</div>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 28, color: "#7a839d" }}>De: número desconhecido</div>
      </div>
      <div style={{ marginTop: 40, background: PC.pix, borderRadius: 30, padding: "32px 0", textAlign: "center", fontWeight: 900, fontSize: 48, color: "#073b27", transform: `scale(${1 - 0.06 * toque})`, boxShadow: toque > 0.3 ? "0 4px 0 #0f9d66" : "0 12px 0 #0f9d66" }}>DEVOLVER PIX</div>
      <div style={{ position: "absolute", left: 28, right: 28, top: 540, background: "#fff", borderRadius: 40, border: `8px solid ${PC.alerta}`, padding: "34px 30px 38px", textAlign: "center", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", transform: `scale(${erro})`, opacity: Math.min(1, erro * 1.5) }}>
        <div style={{ fontWeight: 900, fontSize: 60, color: PC.alerta }}>⚠ NÃO DÁ</div>
        <div style={{ marginTop: 12, fontWeight: 900, fontSize: 40, color: PC.tinta, lineHeight: 1.2 }}>Devolução indisponível</div>
        <div style={{ marginTop: 12, fontWeight: 700, fontSize: 30, color: "#6b7390", lineHeight: 1.25 }}>O remetente travou este Pix por 7 dias.</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center", transform: `scale(${bloqueado})`, opacity: bloqueado }}>
        <svg width="120" height="130" viewBox="-60 -70 120 130">
          <path d="M -26 -10 L -26 -34 Q -26 -60 0 -60 Q 26 -60 26 -34 L 26 -10" fill="none" stroke="#3a4272" strokeWidth="14" strokeLinecap="round" />
          <rect x="-44" y="-12" width="88" height="68" rx="14" fill={PC.amarelo} stroke="#c9921a" strokeWidth="6" />
          <circle cy="16" r="9" fill="#4a3500" />
        </svg>
        <div style={{ fontWeight: 900, fontSize: 64, color: PC.alertaEscuro }}>7 DIAS</div>
      </div>
    </div>
  );
};

export const Tentativa = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 13 } });
  const noApp = frame >= 70;
  const erro = frame >= 114;
  return (
    <AbsoluteFill>
      <Apartamento />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(540 1830) scale(0.95)">
          <Caio boca={erro ? "o" : "reta"} sobrancelha={erro ? "choque" : "estresse"} pupilas={[0, -0.8]} celular={false} tremor={erro ? 2.5 : 0.5} suor={erro} />
        </g>
      </svg>
      <Celular x={240} y={250} largura={600} altura={1000} entrada={entrada} fundo="#10142b">
        {noApp ? <App frame={frame} /> : <Ligando frame={frame} />}
      </Celular>
    </AbsoluteFill>
  );
};
