import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { BRANCO, CREME, ESCURO, SEMANA } from "../Elementos";
import { Icone } from "../Icones";

// Página do bloquinho de calendário, desenhada em HTML (700x700).
const Pagina = ({ topo, nome, sufixo, cor, style }) => {
  const tamanho = Math.min(150, Math.floor(600 / (nome.length * 0.78)));
  return (
    <div
      style={{
        position: "absolute",
        left: 190,
        top: 420,
        width: 700,
        height: 640,
        borderRadius: 44,
        background: CREME,
        boxShadow: "0 22px 0 rgba(0,0,0,0.25)",
        overflow: "hidden",
        fontFamily,
        transformOrigin: "50% 0%",
        ...style,
      }}
    >
      <div style={{ height: 150, background: cor, display: "flex", alignItems: "center", justifyContent: "center", color: BRANCO, fontWeight: 900, fontSize: 70, letterSpacing: 8 }}>
        {topo}
      </div>
      <div style={{ position: "absolute", top: 150, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: ESCURO }}>
        <div style={{ fontWeight: 900, fontSize: tamanho, lineHeight: 1 }}>{nome}</div>
        {sufixo && <div style={{ fontWeight: 800, fontSize: 70, opacity: 0.55, marginTop: 10 }}>{sufixo}</div>}
      </div>
    </div>
  );
};

export const Gancho = ({ dia, cena }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14 } });
  // a página do dia anterior cai e revela a do dia
  const anterior = SEMANA[(dia.ordem + 5) % 7];
  const queda = interpolate(frame, [22, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const icone = spring({ frame: frame - 40, fps, config: { damping: 9 } });
  const tituloEm = Math.min(70, Math.round(cena.duracao * 0.35));

  return (
    <AbsoluteFill>
      <Fundo de={dia.cores.fundo1} para={dia.cores.fundo2} seed={`${dia.id}-gancho`} corParticula={dia.cores.cor} />
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${interpolate(entrada, [0, 1], [900, 0])}px)` }}>
        {/* argolas do bloquinho */}
        <div style={{ position: "absolute", left: 160, top: 395, width: 760, height: 50, borderRadius: 20, background: "rgba(0,0,0,0.3)" }} />
        <Pagina topo={dia.curto} nome={dia.nome} sufixo={dia.sufixo} cor={dia.cores.corEscura} />
        {queda < 1 && (
          <Pagina
            topo={anterior.curto}
            nome={anterior.nome}
            sufixo={anterior.sufixo}
            cor="#6c757d"
            style={{
              transform: `translateY(${queda * 1200}px) rotate(${queda * 25}deg)`,
              opacity: 1 - queda * 0.3,
            }}
          />
        )}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(880 440) scale(${0.55 * icone}) rotate(${interpolate(icone, [0, 1], [-40, 0])})`}>
          <circle r={190} fill={dia.cores.fundo1} stroke={dia.cores.cor} strokeWidth={14} />
          <g transform="scale(0.85)">
            <Icone nome={dia.planeta} />
          </g>
        </g>
      </svg>
      <CaixaTexto texto={cena.titulo} atraso={tituloEm} top={1150} tamanho={78} fundo="rgba(0,0,0,0.28)" cor={BRANCO} />
    </AbsoluteFill>
  );
};
