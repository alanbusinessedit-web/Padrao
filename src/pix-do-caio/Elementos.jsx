import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";
import { PC } from "./cores";

export const brl = (v) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Contador fixo no topo de TODAS as cenas: DIAS | SALDO | SUSPEITA.
// `alerta` faz o painel tremer e piscar em vermelho (usado no twist).
export const Contador = ({ dias, saldo, suspeita, alerta = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14 } });
  const tremor = alerta ? Math.sin(frame * 2.4) * 5 * alerta : 0;
  const pisca = alerta ? 0.5 + 0.5 * Math.sin(frame / 3) : 0;

  const celula = (rotulo, valor, largura, extra) => (
    <div
      style={{
        width: largura,
        padding: "14px 0 16px",
        textAlign: "center",
        fontFamily,
        color: PC.branco,
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 3, opacity: 0.65 }}>{rotulo}</div>
      <div style={{ fontWeight: 900, fontSize: 50, lineHeight: 1.1 }}>{valor}</div>
      {extra}
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 40,
        right: 40,
        transform: `translate(${tremor}px, ${interpolate(entrada, [0, 1], [-200, 0])}px)`,
        display: "flex",
        justifyContent: "space-between",
        borderRadius: 36,
        background: alerta ? `rgba(${60 + 120 * pisca}, 18, 36, 0.96)` : "rgba(18, 20, 42, 0.94)",
        border: `4px solid ${alerta ? PC.alerta : PC.hud2}`,
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
      }}
    >
      {celula("DIAS", dias, 210)}
      <div style={{ width: 4, background: PC.hud2, margin: "18px 0" }} />
      {celula("SALDO", <span style={{ color: PC.pix }}>{brl(saldo)}</span>, 440)}
      <div style={{ width: 4, background: PC.hud2, margin: "18px 0" }} />
      {celula(
        "SUSPEITA",
        <span style={{ color: suspeita >= 60 ? PC.alerta : suspeita >= 30 ? PC.amarelo : PC.branco }}>{suspeita}%</span>,
        290,
        <div style={{ height: 8, borderRadius: 4, background: PC.hud2, margin: "4px 40px 0", overflow: "hidden" }}>
          <div style={{ width: `${suspeita}%`, height: "100%", background: PC.alerta }} />
        </div>,
      )}
    </div>
  );
};

// Apartamento pequeno brasileiro (parede clara, sofá, janela, luz de LED).
// clima: "dia" | "tenso" (escurece, tom azulado e janela com persiana).
export const Apartamento = ({ clima = "dia", sombra = null }) => {
  const frame = useCurrentFrame();
  const noite = clima === "tenso";
  const led = 0.65 + 0.35 * Math.sin(frame / 30);
  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="parede" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={noite ? "#2a2f52" : PC.parede} />
            <stop offset="1" stopColor={noite ? "#1c2040" : PC.parede2} />
          </linearGradient>
          <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={noite ? "#10153a" : "#9fd8f5"} />
            <stop offset="1" stopColor={noite ? "#2b2057" : "#e8f6ff"} />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#parede)" />
        {/* faixa de LED no teto */}
        <rect x="0" y="262" width="1080" height="10" fill={noite ? "#7a5cff" : "#ffe9a8"} opacity={led} />
        <rect x="0" y="272" width="1080" height="70" fill={noite ? "#7a5cff" : "#ffe9a8"} opacity={0.08 * led} />
        {/* janela */}
        <g transform="translate(90 420)">
          <rect x="-14" y="-14" width="388" height="548" rx="20" fill={noite ? "#171a38" : "#fdfaf1"} />
          <rect width="360" height="520" rx="12" fill="url(#ceu)" />
          {!noite && (
            <>
              <circle cx="270" cy="110" r="46" fill="#ffd166" />
              <rect x="20" y="360" width="60" height="160" fill="#c8d3e6" />
              <rect x="100" y="300" width="80" height="220" fill="#b3c0d6" />
              <rect x="200" y="400" width="70" height="120" fill="#c8d3e6" />
              <rect x="290" y="330" width="70" height="190" fill="#b3c0d6" />
            </>
          )}
          {noite && (
            <>
              {[...Array(14)].map((_, i) => (
                <rect key={i} x={30 + (i % 7) * 48} y={330 + Math.floor(i / 7) * 80} width="18" height="26" fill="#ffd166" opacity={random(`j${i}`) > 0.4 ? 0.8 : 0.2} />
              ))}
              {sombra}
              {/* persiana */}
              {[...Array(26)].map((_, i) => (
                <rect key={i} y={i * 20} width="360" height="9" fill="#0b0d22" opacity="0.88" />
              ))}
            </>
          )}
          <rect x="178" width="6" height="520" fill={noite ? "#171a38" : "#fdfaf1"} />
        </g>
        {/* quadro e prateleira */}
        <rect x="560" y="470" width="190" height="240" rx="10" fill={noite ? "#171a38" : PC.madeira} />
        <rect x="578" y="488" width="154" height="204" rx="4" fill={noite ? "#2f3566" : "#f6a8a8"} />
        <circle cx="655" cy="570" r="42" fill={noite ? "#4b52a0" : "#ffd166"} />
        <rect x="560" y="800" width="460" height="16" rx="6" fill={noite ? "#171a38" : PC.madeira} />
        <rect x="600" y="750" width="44" height="50" rx="8" fill={noite ? "#4b52a0" : "#4cc9f0"} />
        <rect x="920" y="716" width="64" height="84" rx="6" fill={noite ? "#2f3566" : "#ef476f"} />
        {/* sofá */}
        <g transform="translate(540 1330)">
          <rect x="-470" y="-250" width="940" height="260" rx="60" fill={noite ? "#2b3354" : PC.sofa} />
          <rect x="-500" y="-120" width="110" height="240" rx="40" fill={noite ? "#222a48" : PC.sofa2} />
          <rect x="390" y="-120" width="110" height="240" rx="40" fill={noite ? "#222a48" : PC.sofa2} />
          <rect x="-400" y="-70" width="800" height="150" rx="40" fill={noite ? "#222a48" : PC.sofa2} />
        </g>
        {/* chão */}
        <rect x="0" y="1480" width="1080" height="440" fill={noite ? "#171a38" : PC.chao} />
        <rect x="0" y="1480" width="1080" height="14" fill={noite ? "#10122b" : PC.chao2} />
        {[...Array(6)].map((_, i) => (
          <rect key={i} x="0" y={1520 + i * 70} width="1080" height="3" fill={noite ? "#10122b" : PC.chao2} opacity="0.5" />
        ))}
        {/* vaso */}
        <g transform="translate(990 1450)">
          <path d="M -40 0 L 40 0 L 30 -90 L -30 -90 Z" fill={noite ? "#4b3322" : "#c97b4a"} />
          <path d="M 0 -90 Q -70 -150 -50 -230 Q -10 -180 0 -90 Z" fill={noite ? "#1d6a4e" : "#2fbf71"} />
          <path d="M 0 -90 Q 70 -170 40 -250 Q 0 -190 0 -90 Z" fill={noite ? "#238a63" : "#46d98a"} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Moldura de celular: conteúdo (HTML) dentro da tela. Flutua levemente.
export const Celular = ({ x = 240, y = 270, largura = 600, altura = 980, children, inclinacao = 0, entrada = 1, fundo = "#f5f7fb" }) => {
  const frame = useCurrentFrame();
  const flutua = Math.sin(frame / 22) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + flutua,
        width: largura,
        height: altura,
        borderRadius: 74,
        background: "#0b0b16",
        padding: 18,
        boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 0 0 4px #2b2b44",
        transform: `rotate(${inclinacao}deg) scale(${entrada})`,
        opacity: Math.min(1, entrada * 1.4),
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 58, background: fundo, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 14, left: "50%", marginLeft: -60, width: 120, height: 30, borderRadius: 15, background: "#0b0b16", zIndex: 5 }} />
        {children}
      </div>
    </div>
  );
};

// Notas de dinheiro caindo (flat).
export const Notas = ({ quantidade = 14, inicio = 0, seed = "notas" }) => {
  const frame = useCurrentFrame();
  return (
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      {[...Array(quantidade)].map((_, i) => {
        const t = frame - inicio - random(`${seed}-t-${i}`) * 50;
        if (t < 0) return null;
        const x = 80 + random(`${seed}-x-${i}`) * 920;
        const y = -120 + t * (7 + random(`${seed}-v-${i}`) * 6);
        const rot = random(`${seed}-r-${i}`) * 360 + t * (2 + random(`${seed}-w-${i}`) * 4);
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`} opacity="0.95">
            <rect x="-62" y="-34" width="124" height="68" rx="8" fill="#52c77e" />
            <rect x="-54" y="-27" width="108" height="54" rx="5" fill="none" stroke="#2f8f56" strokeWidth="3" />
            <circle r="17" fill="#2f8f56" />
            <text y="9" textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize="24" fill="#d8ffe6">R$</text>
          </g>
        );
      })}
    </svg>
  );
};

// Texto que "digita" letra por letra. Retorna o trecho visível.
export const digitar = (texto, frame, inicio, velocidade = 1.1) => {
  const n = Math.max(0, Math.floor((frame - inicio) * velocidade));
  return texto.slice(0, n);
};
