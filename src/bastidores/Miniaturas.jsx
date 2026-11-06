import { B } from "./estilo";

// Ilustrações simples das capas dos vídeos do canal (viewBox 400x300).
const Quadro = ({ largura, altura, de, para, children }) => (
  <svg width={largura} height={altura} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
    <defs>
      <linearGradient id={`g-${de}-${para}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={de} />
        <stop offset="1" stopColor={para} />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill={`url(#g-${de}-${para})`} />
    {children}
  </svg>
);

export const Balanca = ({ largura, altura }) => (
  <Quadro largura={largura} altura={altura} de="#1d2a4a" para="#33264a">
    <rect x="0" y="250" width="400" height="50" fill="#141b33" />
    <rect x="192" y="70" width="16" height="170" fill={B.laranja} />
    <rect x="150" y="236" width="100" height="16" fill={B.laranja} />
    <rect x="90" y="80" width="220" height="12" fill={B.laranja} />
    <rect x="190" y="56" width="20" height="20" fill={B.laranja} />
    {[110, 290].map((cx) => (
      <g key={cx} fill={B.creme}>
        <rect x={cx - 2} y="92" width="4" height="70" />
        <rect x={cx - 40} y="160" width="80" height="12" />
        <rect x={cx - 30} y="172" width="60" height="10" />
      </g>
    ))}
  </Quadro>
);

export const Martelo = ({ largura, altura }) => (
  <Quadro largura={largura} altura={altura} de="#4a2a1a" para="#2a1810">
    <rect x="80" y="220" width="240" height="30" fill="#6b3f24" />
    <rect x="110" y="200" width="180" height="20" fill="#8a5530" />
    <g transform="rotate(-30 200 140)">
      <rect x="120" y="80" width="130" height="60" fill="#a8693a" />
      <rect x="110" y="88" width="14" height="44" fill="#d9a066" />
      <rect x="246" y="88" width="14" height="44" fill="#d9a066" />
      <rect x="178" y="140" width="16" height="130" fill="#7a4a2a" />
    </g>
  </Quadro>
);

export const Urna = ({ largura, altura }) => (
  <Quadro largura={largura} altura={altura} de="#2d6a6b" para="#173c40">
    <rect x="90" y="110" width="220" height="150" fill="#e9ecef" />
    <rect x="90" y="110" width="220" height="24" fill="#ced4da" />
    <rect x="110" y="150" width="90" height="60" fill="#3a5a78" />
    {[0, 1, 2].map((l) =>
      [0, 1, 2].map((c) => <rect key={`${l}-${c}`} x={220 + c * 26} y={150 + l * 24} width="18" height="16" fill="#495057" />),
    )}
    <rect x="220" y="226" width="70" height="18" fill={B.verde} />
    <rect x="160" y="40" width="80" height="70" fill={B.creme} />
    <rect x="175" y="58" width="50" height="8" fill="#9aa" />
  </Quadro>
);

export const Livro = ({ largura, altura }) => (
  <Quadro largura={largura} altura={altura} de="#3b2a4f" para="#1e1730">
    <rect x="110" y="60" width="180" height="200" fill="#1f5a3a" />
    <rect x="110" y="60" width="20" height="200" fill="#163f29" />
    <rect x="150" y="90" width="110" height="10" fill={B.laranja} />
    <rect x="150" y="110" width="110" height="10" fill={B.laranja} />
    <rect x="175" y="150" width="60" height="60" fill={B.laranja} />
    <rect x="190" y="165" width="30" height="30" fill="#1f5a3a" />
    <rect x="285" y="66" width="10" height="190" fill={B.creme} />
  </Quadro>
);

export const MINIATURAS = [Balanca, Martelo, Urna, Livro];
