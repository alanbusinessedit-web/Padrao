import { FC } from "./cores";

// Foice e martelo simplificados (centrados em 0,0, ~200px).
export const IconeComunismo = ({ cor = FC.ouro }) => (
  <g>
    {/* foice: lâmina em arco com o cabo embaixo à esquerda */}
    <path d="M -36 41 A 65 65 0 1 0 -51 -27" stroke={cor} strokeWidth={20} strokeLinecap="round" fill="none" />
    <line x1={-36} y1={41} x2={-72} y2={77} stroke={cor} strokeWidth={24} strokeLinecap="round" />
    {/* martelo: cabo na diagonal, cabeça no alto à esquerda */}
    <line x1={64} y1={74} x2={-26} y2={-16} stroke={cor} strokeWidth={18} strokeLinecap="round" />
    <rect x={-44} y={-16} width={88} height={32} rx={8} fill={cor} transform="translate(-30 -20) rotate(-45)" />
  </g>
);

// Fasces: feixe de varas amarrado com um machado (o símbolo que deu nome ao fascismo).
export const IconeFascismo = ({ cor = FC.ouro, corVaras = FC.fasClaro }) => (
  <g>
    <path d="M 26 -78 Q 92 -62 26 -22 Z" fill={cor} />
    {[-28, -14, 0, 14, 28].map((x) => (
      <rect key={x} x={x - 7} y={-90} width={14} height={180} rx={7} fill={corVaras} />
    ))}
    {[-48, 0, 48].map((y) => (
      <rect key={y} x={-42} y={y - 7} width={84} height={14} rx={7} fill={cor} />
    ))}
  </g>
);

// Pessoa genérica flat. `cartola` = burguês, `quepe` = uniforme.
export const Pessoa = ({ x = 0, y = 0, cor = FC.creme, escala = 1, cartola = false, quepe = false, corRoupa }) => (
  <g transform={`translate(${x} ${y}) scale(${escala})`}>
    <path d="M -32 30 Q -32 -14 0 -14 Q 32 -14 32 30 Z" fill={corRoupa ?? cor} />
    <circle cx={0} cy={-40} r={21} fill={cor} />
    {cartola && (
      <g fill={FC.fasEscuro}>
        <rect x={-26} y={-66} width={52} height={8} rx={4} />
        <rect x={-16} y={-100} width={32} height={38} rx={4} />
      </g>
    )}
    {quepe && (
      <g fill={FC.fasEscuro}>
        <rect x={-24} y={-64} width={48} height={12} rx={6} />
        <rect x={-6} y={-58} width={36} height={6} rx={3} />
      </g>
    )}
  </g>
);
