import { AbsoluteFill } from "remotion";
import { fontFamily } from "../fonte";

export const MARCA = {
  azul1: "#1b1f3b",
  azul2: "#2a2f5a",
  ouro: "#f2c14e",
  ouroEscuro: "#d9a52b",
  ciano: "#4cc9f0",
  branco: "#ffffff",
};

// Símbolo: balão de fala (narrar) com a balança da justiça (direito) e ondas de som.
// Centrado em 0,0, cabe num quadrado de ~620px.
export const Simbolo = () => (
  <g>
    {/* ondas de som */}
    {[262, 310].map((r, i) => {
      const a = (30 * Math.PI) / 180;
      return (
        <path
          key={r}
          d={`M ${r * Math.cos(-a)} ${r * Math.sin(-a)} A ${r} ${r} 0 0 1 ${r * Math.cos(a)} ${r * Math.sin(a)}`}
          stroke={MARCA.ciano}
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
          opacity={1 - i * 0.35}
        />
      );
    })}

    {/* balão de fala com sombra flat */}
    <g transform="translate(10 14)" fill={MARCA.ouroEscuro}>
      <circle r={215} />
      <path d="M -150 120 L -215 225 L -60 185 Z" />
    </g>
    <g fill={MARCA.ouro}>
      <circle r={215} />
      <path d="M -150 120 L -215 225 L -60 185 Z" />
    </g>

    {/* balança da justiça */}
    <g fill={MARCA.azul1} stroke={MARCA.azul1}>
      <rect x={-11} y={-112} width={22} height={196} rx={11} stroke="none" />
      <rect x={-78} y={78} width={156} height={26} rx={13} stroke="none" />
      <circle cy={-124} r={20} stroke="none" />
      <rect x={-150} y={-104} width={300} height={18} rx={9} stroke="none" />
      {[-120, 120].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1={-95} x2={cx - 42} y2={8} strokeWidth={7} strokeLinecap="round" />
          <line x1={cx} y1={-95} x2={cx + 42} y2={8} strokeWidth={7} strokeLinecap="round" />
          <path d={`M ${cx - 56} 8 A 56 46 0 0 0 ${cx + 56} 8 Z`} stroke="none" />
        </g>
      ))}
    </g>
  </g>
);

const Nome = ({ x, y, tamanho, alinhamento = "middle" }) => (
  <text x={x} y={y} textAnchor={alinhamento} fontFamily={fontFamily} fontWeight={900} letterSpacing={tamanho * 0.04}>
    <tspan x={x} fill={MARCA.branco} fontSize={tamanho}>
      NARRANDO
    </tspan>
    <tspan x={x} dy={tamanho * 1.02} fill={MARCA.ouro} fontSize={tamanho * 0.86}>
      O DIREITO
    </tspan>
  </text>
);

// Quadrado (perfil do Instagram/TikTok/YouTube). Tudo dentro do círculo central,
// então funciona com o recorte redondo das redes.
export const LogoQuadrado = ({ fundo = true }) => (
  <AbsoluteFill style={{ background: fundo ? `radial-gradient(circle at 50% 40%, ${MARCA.azul2}, ${MARCA.azul1})` : "transparent" }}>
    <svg viewBox="0 0 1080 1080" width="100%" height="100%">
      <g transform="translate(520 400) scale(0.82)">
        <Simbolo />
      </g>
      <Nome x={540} y={790} tamanho={112} />
    </svg>
  </AbsoluteFill>
);

// Horizontal (banner, marca d'água, abertura de vídeo).
export const LogoHorizontal = ({ fundo = true }) => (
  <AbsoluteFill style={{ background: fundo ? `linear-gradient(120deg, ${MARCA.azul1}, ${MARCA.azul2})` : "transparent" }}>
    <svg viewBox="0 0 1600 600" width="100%" height="100%">
      <g transform="translate(300 290) scale(0.72)">
        <Simbolo />
      </g>
      <Nome x={620} y={270} tamanho={130} alinhamento="start" />
    </svg>
  </AbsoluteFill>
);
