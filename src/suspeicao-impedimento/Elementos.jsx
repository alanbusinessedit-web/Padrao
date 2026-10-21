import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";
import { SI } from "./cores";

// Juiz de toga atrás da bancada, batendo o martelo. Centrado em 0,0 (bancada em y=0).
export const Juiz = ({ batidas = [], expressao = "neutra", mesa = true }) => {
  const frame = useCurrentFrame();
  const angulo = batidas.reduce((a, b) => {
    const t = frame - b;
    return t >= 0 && t < 10 ? Math.min(a, -50 * Math.sin((t / 10) * Math.PI)) : a;
  }, 0);
  return (
    <g>
      <path d="M -150 40 Q -150 -150 0 -150 Q 150 -150 150 40 Z" fill={SI.toga} />
      <path d="M -36 -150 L 0 -92 L 36 -150 Z" fill={SI.branco} />
      <circle cx={0} cy={-215} r={68} fill={SI.pele} />
      <path d="M -70 -220 Q -72 -292 0 -292 Q 72 -292 70 -220 Q 52 -262 0 -262 Q -52 -262 -70 -220 Z" fill={SI.cabelo} />
      <circle cx={-24} cy={-215} r={8} fill={SI.toga} />
      <circle cx={24} cy={-215} r={8} fill={SI.toga} />
      {expressao === "duvida" ? (
        <rect x={-18} y={-182} width={36} height={8} rx={4} fill={SI.toga} transform="rotate(-8)" />
      ) : (
        <path d="M -20 -184 Q 0 -170 20 -184" stroke={SI.toga} strokeWidth={7} strokeLinecap="round" fill="none" />
      )}
      {mesa && (
        <g>
          <rect x={-300} y={-20} width={600} height={190} rx={18} fill={SI.madeira} />
          <rect x={-320} y={-40} width={640} height={40} rx={14} fill={SI.madeiraClara} />
          <rect x={-90} y={30} width={180} height={90} rx={10} fill={SI.madeiraClara} opacity={0.5} />
          {/* martelo */}
          <g transform={`translate(190 -46) rotate(${angulo} 50 0)`}>
            <rect x={-10} y={-10} width={110} height={18} rx={9} fill={SI.madeiraClara} />
            <rect x={-38} y={-34} width={40} height={66} rx={10} fill={SI.toga} />
          </g>
          <rect x={130} y={-50} width={70} height={14} rx={7} fill={SI.toga} />
        </g>
      )}
    </g>
  );
};

// Selo de artigo de lei (ex.: "CPC art. 144").
export const SeloLei = ({ codigo, artigo, cor, x, y, inicio = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 11 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "rgba(255,255,255,0.1)",
        borderRadius: 999,
        padding: "12px 28px 12px 12px",
        fontFamily,
        transform: `scale(${s})`,
        opacity: s,
      }}
    >
      <span style={{ background: cor, color: SI.fundo1, fontWeight: 900, fontSize: 32, padding: "8px 20px", borderRadius: 999 }}>{codigo}</span>
      <span style={{ color: SI.branco, fontWeight: 800, fontSize: 36 }}>{artigo}</span>
    </div>
  );
};

// Item de lista com ícone, que entra deslizando da direita.
export const Item = ({ top, cor, inicio, titulo, texto, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 50,
        width: 980,
        height: 190,
        borderRadius: 36,
        background: "rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 30,
        padding: "0 34px",
        fontFamily,
        color: SI.branco,
        transform: `translateX(${interpolate(s, [0, 1], [1100, 0])}px)`,
      }}
    >
      <svg viewBox="-80 -80 160 160" width={140} height={140} style={{ flexShrink: 0 }}>
        <circle r={78} fill={cor} />
        {children}
      </svg>
      <div>
        <div style={{ fontWeight: 900, fontSize: 44, lineHeight: 1.05 }}>{titulo}</div>
        {texto && <div style={{ fontWeight: 600, fontSize: 32, marginTop: 8, opacity: 0.9 }}>{texto}</div>}
      </div>
    </div>
  );
};

// Etiqueta grande (OBJETIVO / SUBJETIVO).
export const Etiqueta = ({ texto, cor, top, inicio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 8, stiffness: 160 } });
  return (
    <div style={{ position: "absolute", top, width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 50,
          letterSpacing: 6,
          color: SI.branco,
          background: cor,
          padding: "14px 40px",
          borderRadius: 18,
          transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-10, -3])}deg)`,
        }}
      >
        {texto}
      </div>
    </div>
  );
};

// Ícones simples para os itens (desenhados em -80..80).
export const IconeFamilia = () => (
  <g fill={SI.branco}>
    <circle cx={-30} cy={-22} r={16} />
    <path d="M -56 34 Q -56 -2 -30 -2 Q -4 -2 -4 34 Z" />
    <circle cx={26} cy={-26} r={18} />
    <path d="M -2 34 Q -2 -6 26 -6 Q 54 -6 54 34 Z" />
  </g>
);
export const IconePasta = () => (
  <g fill={SI.branco}>
    <rect x={-48} y={-22} width={96} height={64} rx={10} />
    <rect x={-20} y={-38} width={40} height={20} rx={6} fill="none" stroke={SI.branco} strokeWidth={8} />
  </g>
);
export const IconeVoltar = () => (
  <g stroke={SI.branco} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M -30 -30 A 46 46 0 1 1 -42 14" />
    <path d="M -50 -48 L -30 -30 L -50 -10" />
  </g>
);
export const IconeCoracao = () => (
  <path d="M 0 40 C -60 0 -50 -50 -20 -46 C -8 -44 0 -34 0 -26 C 0 -34 8 -44 20 -46 C 50 -50 60 0 0 40 Z" fill={SI.branco} />
);
export const IconeMoeda = () => (
  <g>
    <circle r={44} fill={SI.branco} />
    <text y={20} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={60} fill={SI.sus}>
      $
    </text>
  </g>
);
export const IconeConselho = () => (
  <g fill={SI.branco}>
    <rect x={-46} y={-38} width={92} height={60} rx={20} />
    <path d="M -24 18 L -34 44 L 4 20 Z" />
  </g>
);
export const IconeAlvo = () => (
  <g fill="none" stroke={SI.branco} strokeWidth={10}>
    <circle r={42} />
    <circle r={20} />
    <circle r={4} fill={SI.branco} />
  </g>
);
