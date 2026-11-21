import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, Celular, brl, digitar } from "../Elementos";
import { Caio } from "../Personagens";
import { PC } from "../cores";

// 6-15s: notificação do PIX + a mensagem "NÃO GASTA. EM 7 DIAS EU BUSCO."
export const Mensagem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 13 } });
  const card = spring({ frame: frame - 14, fps, config: { damping: 12 } });
  const bolha = spring({ frame: frame - 84, fps, config: { damping: 12 } });
  const texto = digitar("NÃO GASTA. EM 7 DIAS EU BUSCO.", frame, 112, 0.5);
  const pontos = frame > 84 && frame < 112;

  return (
    <AbsoluteFill>
      <Apartamento />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(540 1830) scale(0.95)">
          <Caio boca="o" sobrancelha="choque" pupilas={[0, -0.8]} celular={false} tremor={0.8} />
        </g>
      </svg>
      <Celular x={240} y={250} largura={600} altura={1000} entrada={entrada} fundo="#eef1f7">
        <div style={{ padding: "74px 26px 0", fontFamily }}>
          <div style={{ fontWeight: 800, fontSize: 28, color: "#6b7390", letterSpacing: 2 }}>BANCO • EXTRATO</div>
          <div
            style={{
              marginTop: 22,
              background: "#fff",
              borderRadius: 34,
              padding: "30px 30px 34px",
              boxShadow: "0 16px 34px rgba(20,30,70,0.18)",
              transform: `translateY(${interpolate(card, [0, 1], [-140, 0])}px)`,
              opacity: card,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 70, height: 70, borderRadius: 22, background: PC.pix, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 34, color: "#073b27" }}>PIX</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 36, color: "#14203f" }}>Pix recebido</div>
                <div style={{ fontWeight: 600, fontSize: 26, color: "#7a839d" }}>agora mesmo</div>
              </div>
            </div>
            <div style={{ marginTop: 22, fontWeight: 900, fontSize: 66, color: PC.pixEscuro, letterSpacing: -1 }}>{brl(12847.32)}</div>
            <div style={{ marginTop: 6, fontWeight: 700, fontSize: 28, color: "#7a839d" }}>De: número desconhecido</div>
          </div>
          <div style={{ marginTop: 36, fontWeight: 800, fontSize: 28, color: "#6b7390", letterSpacing: 2, opacity: bolha }}>MENSAGEM</div>
          <div
            style={{
              marginTop: 14,
              background: pontos ? "#d9deea" : "#1b1b2f",
              borderRadius: 34,
              borderTopLeftRadius: 8,
              padding: "30px 30px 34px",
              minHeight: 170,
              transform: `scale(${bolha})`,
              transformOrigin: "0 0",
              opacity: bolha,
            }}
          >
            {pontos ? (
              <div style={{ display: "flex", gap: 14, paddingTop: 36 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: "#7a839d", opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame / 6 + i)) }} />
                ))}
              </div>
            ) : (
              <div style={{ fontWeight: 900, fontSize: 50, lineHeight: 1.18, color: PC.alerta, letterSpacing: 1 }}>{texto}<span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span></div>
            )}
          </div>
        </div>
      </Celular>
    </AbsoluteFill>
  );
};
