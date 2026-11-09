import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { BRANCO, ESCURO, SEMANA } from "../Elementos";

// Encerramento: a semana com os dias já vistos marcados e o próximo da série.
export const Final = ({ dia, cena }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mola = (inicio, damping = 12) => spring({ frame: frame - inicio, fps, config: { damping } });
  const fimSerie = !cena.proximo;
  const proximo = mola(30);
  const siga = mola(55, 10);
  const pulso = 1 + 0.05 * Math.sin(frame / 5);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Fundo de={dia.cores.fundo1} para={dia.cores.fundo2} seed={`${dia.id}-final`} corParticula={dia.cores.cor} />
      <CaixaTexto texto={fimSerie ? "SÉRIE COMPLETA!" : "DIAS DA SEMANA"} atraso={2} top={200} tamanho={78} fundo="rgba(0,0,0,0.28)" />
      <div style={{ position: "absolute", top: 480, left: 50, right: 50, display: "flex", justifyContent: "space-between" }}>
        {SEMANA.map((d, i) => {
          const visto = i < dia.ordem;
          const atual = i === dia.ordem - 1;
          const eProximo = i === dia.ordem;
          const s = mola(6 + i * 4);
          const check = mola(14 + i * 4, 9);
          return (
            <div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, transform: `scale(${s * (eProximo ? pulso : 1)})` }}>
              <div
                style={{
                  width: 124,
                  height: 124,
                  borderRadius: 999,
                  background: visto ? dia.cores.cor : "rgba(0,0,0,0.3)",
                  border: eProximo ? `8px dashed ${dia.cores.cor}` : atual ? `8px solid ${BRANCO}` : "8px solid transparent",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {visto ? (
                  <svg viewBox="-50 -50 100 100" width={70} height={70} style={{ transform: `scale(${check})` }}>
                    <path d="M -28 2 L -8 22 L 30 -20" stroke={ESCURO} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                ) : (
                  <span style={{ color: BRANCO, fontWeight: 900, fontSize: 40, opacity: 0.6 }}>?</span>
                )}
              </div>
              <span style={{ color: BRANCO, fontWeight: 900, fontSize: 32, opacity: visto || eProximo ? 1 : 0.6 }}>{d.curto}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 760, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 900,
            borderRadius: 40,
            background: "rgba(0,0,0,0.3)",
            border: `6px solid ${dia.cores.cor}`,
            padding: "36px 0",
            textAlign: "center",
            color: BRANCO,
            transform: `translateY(${interpolate(proximo, [0, 1], [80, 0])}px)`,
            opacity: proximo,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 38, letterSpacing: 6, opacity: 0.8 }}>{fimSerie ? "VOCÊ VIU OS" : "PRÓXIMO"}</div>
          <div style={{ fontWeight: 900, fontSize: 96, color: dia.cores.cor, marginTop: 6 }}>{fimSerie ? "7 DIAS" : cena.proximo}</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 1130, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 56,
            color: ESCURO,
            background: dia.cores.cor,
            padding: "28px 60px",
            borderRadius: 999,
            transform: `scale(${siga * pulso})`,
            opacity: siga,
          }}
        >
          {fimSerie ? "SIGA PARA MAIS" : "SIGA PARA VER"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
