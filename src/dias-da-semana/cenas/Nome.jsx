import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { BRANCO, CREME, ESCURO, VERMELHO, quando } from "../Elementos";
import { Icone } from "../Icones";

// "De onde vem o nome": palavra em latim -> tradução -> nome antigo riscado -> outras línguas.
export const Nome = ({ dia, cena }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mola = (inicio, damping = 13) => spring({ frame: frame - inicio, fps, config: { damping } });

  const tAntes = quando(cena, "Antes", Math.round(cena.duracao * 0.45));
  const tLinguas = Math.max(tAntes + 50, Math.min(tAntes + 75, quando(cena, cena.linguas[0][1], tAntes + 60) - 10));
  const tTraducao = Math.max(30, Math.min(tAntes - 40, quando(cena, cena.traducao.split(" ").at(-1), 40)));

  const latim = mola(10);
  const traducao = mola(tTraducao, 11);
  const antes = mola(tAntes);
  const risco = interpolate(frame, [tAntes + 45, tAntes + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const tamLatim = Math.min(88, Math.floor(820 / (cena.latim.length * 0.74)));
  const tamTraducao = Math.min(64, Math.floor(900 / (cena.traducao.length * 0.72)));
  const tamAntigo = Math.min(64, Math.floor(560 / (cena.antigo.length * 0.72)));

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Fundo de={dia.cores.fundo1} para={dia.cores.fundo2} seed={`${dia.id}-nome`} corParticula={dia.cores.cor} />
      <CaixaTexto texto="A ORIGEM DO NOME" atraso={2} top={160} tamanho={64} fundo="rgba(0,0,0,0.25)" />

      {/* tábua com o nome em latim */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 90,
          width: 900,
          height: 210,
          borderRadius: 30,
          background: CREME,
          boxShadow: "0 14px 0 rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${latim}) rotate(${interpolate(latim, [0, 1], [-8, 0])}deg)`,
        }}
      >
        <div style={{ position: "absolute", top: -26, left: 40, background: dia.cores.corEscura, color: BRANCO, fontWeight: 900, fontSize: 30, letterSpacing: 4, padding: "8px 22px", borderRadius: 999 }}>
          LATIM
        </div>
        <div style={{ fontWeight: 900, fontSize: tamLatim, color: ESCURO, letterSpacing: 4 }}>{cena.latim}</div>
      </div>

      {/* tradução */}
      <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center", opacity: traducao, transform: `translateY(${interpolate(traducao, [0, 1], [40, 0])}px)` }}>
        <span style={{ fontWeight: 900, fontSize: tamTraducao, color: dia.cores.cor }}>= {cena.traducao}</span>
      </div>

      {/* nome antigo, riscado */}
      <div
        style={{
          position: "absolute",
          top: 790,
          left: 60,
          width: 960,
          height: 260,
          borderRadius: 36,
          background: "rgba(0,0,0,0.25)",
          transform: `translateX(${interpolate(antes, [0, 1], [-1100, 0])}px)`,
        }}
      >
        <svg viewBox="-200 -200 400 400" width={220} height={220} style={{ position: "absolute", left: 30, top: 20 }}>
          <circle r={190} fill={dia.cores.fundo1} />
          <g transform="scale(0.85)">
            <Icone nome={dia.planeta} />
          </g>
        </svg>
        <div style={{ position: "absolute", left: 290, top: 0, bottom: 0, right: 30, display: "flex", flexDirection: "column", justifyContent: "center", color: BRANCO }}>
          <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: 4, opacity: 0.75 }}>ANTES ERA</div>
          <div style={{ position: "relative", alignSelf: "flex-start" }}>
            <div style={{ fontWeight: 900, fontSize: tamAntigo, lineHeight: 1.1 }}>{cena.antigo}</div>
            <div style={{ position: "absolute", left: -10, top: "52%", height: 12, borderRadius: 6, background: VERMELHO, width: `calc(${risco * 100}% + ${risco * 20}px)` }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: 34, fontStyle: "italic", opacity: 0.8, marginTop: 4 }}>{cena.antigoLatim}</div>
        </div>
      </div>

      {/* outras línguas */}
      <div style={{ position: "absolute", top: 1100, left: 60, width: 960, display: "flex", gap: 18 }}>
        {cena.linguas.map(([lingua, palavra], i) => {
          const s = mola(tLinguas + i * 8, 11);
          return (
            <div
              key={lingua}
              style={{
                flex: 1,
                height: 170,
                borderRadius: 28,
                background: dia.cores.corEscura,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: BRANCO,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 3, opacity: 0.8 }}>{lingua}</div>
              <div style={{ fontWeight: 900, fontSize: palavra.length > 8 ? 44 : 52, marginTop: 6 }}>{palavra}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
