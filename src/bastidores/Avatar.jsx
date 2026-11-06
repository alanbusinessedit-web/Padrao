import { random, useCurrentFrame } from "remotion";

// Narrador em pixel art: cabelo escuro, fone de ouvido laranja, blazer e gravata.
// Cada letra é um pixel; "." é transparente.
const CORES = {
  K: "#1a1210", // contorno
  H: "#2e1f17", // cabelo
  h: "#4a3326", // brilho do cabelo
  S: "#e2a97c", // pele
  s: "#c58a60", // sombra da pele
  E: "#1a1210", // olhos
  w: "#ffffff", // brilho do olho
  G: "#3b3b44", // haste do fone
  P: "#f2a93b", // fone
  p: "#c98a2e", // sombra do fone
  B: "#27324f", // blazer
  b: "#1b2338", // sombra do blazer
  C: "#f4efe7", // camisa
  T: "#c0392b", // gravata
  M: "#5a2320", // boca
  L: "#e06b5a", // língua
};

const BASE = [
  "......GGGGGGGGGG......",
  "....GGKKKKKKKKKKGG....",
  "...G.KHHHHHHHHHHK.G...",
  "..G.KHHhHHHHHHHHHK.G..",
  "..GKHHhHHHHHHHHHHHKG..",
  "..GKHHHHHHHHHHHHHHKG..",
  "..KHHSSHHHSSSHHHSSHK..",
  "PPKHSSSSSSSSSSSSSSHKPP",
  "PPKSSKKKSSSSSSKKKSSKPP",
  "PPKSSSSSSSSSSSSSSSSKPP",
  "PPKSSwESSSSSSSSwESSKPP",
  "ppKSSEESSSSSSSSEESSKpp",
  "..KSSSSSSSSsSSSSSSSK..",
  "..KsSSSSSSSsSSSSSSsK..",
  "..KsSSSSSSSSSSSSSSsK..",
  "...KsSSSSSSSSSSSSsK...",
  "....KKsSSSSSSSSsKK....",
  "......KKsSSSSsKK......",
  "....KKBBKCCCCKBBKK....",
  "..KKBBBBBKCTCKBBBBKK..",
  ".KBBBBBBBBCTTCBBBBBBK.",
  ".KBBbBBBBBCTTCBBBBbBK.",
  ".KBBbBBBBBBTTBBBBBbBK.",
  ".KBBbBBBBBBBTBBBBBbBK.",
  ".KBBbBBBBBBBBBBBBBbBK.",
  ".KKKKKKKKKKKKKKKKKKKK.",
];

// Boca fechada (linha 14) e aberta (linhas 14 e 15).
const bocaFechada = (g) => {
  g[14] = "..KsSSSSSMMMMSSSSSsK..";
};
const bocaAberta = (g) => {
  g[14] = "..KsSSSSMMMMMMSSSSsK..";
  g[15] = "...KsSSSSMLLMSSSSsK...";
};
const piscar = (g) => {
  g[10] = "PPKSSSSSSSSSSSSSSSSKPP";
  g[11] = "ppKSSKKSSSSSSSSKKSSKpp";
};

const MAO = [
  ".K.K.K..",
  "KSKSKSK.",
  "KSKSKSK.",
  "KSSSSSKK",
  "KSSSSSSK",
  "KSSSSSK.",
  ".KSSSK..",
  "..KBBK..",
  "..KBBK..",
  "..KBBK..",
];

const Pixels = ({ grade, tam, visivel }) =>
  grade.flatMap((linha, y) =>
    [...linha].map((c, x) => {
      if (c === ".") return null;
      if (visivel && !visivel(x, y)) return null;
      return <rect key={`${x}-${y}`} x={x * tam} y={y * tam} width={tam + 0.4} height={tam + 0.4} fill={CORES[c]} />;
    }),
  );

// tam: tamanho de cada pixel. falando: mexe a boca. acenando: levanta a mão.
// surgir (0–1): os pixels aparecem em ordem aleatória (efeito de "materializar").
export const Avatar = ({ tam = 14, falando = false, acenando = false, surgir = 1 }) => {
  const frame = useCurrentFrame();
  const grade = [...BASE];
  if (falando && Math.floor(frame / 4) % 2 === 0) bocaAberta(grade);
  else bocaFechada(grade);
  if (frame % 90 > 84) piscar(grade);

  const visivel = surgir < 1 ? (x, y) => random(`av-${x}-${y}`) < surgir : null;
  const angulo = acenando ? Math.sin(frame / 4) * 14 : 0;
  const largura = 22 * tam;
  const altura = BASE.length * tam;

  return (
    <svg width={largura + 8 * tam} height={altura} viewBox={`0 0 ${largura + 8 * tam} ${altura}`} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
      <Pixels grade={grade} tam={tam} visivel={visivel} />
      {acenando && (
        <g transform={`translate(${19.5 * tam} ${10 * tam}) rotate(${angulo} ${3 * tam} ${10 * tam})`}>
          <Pixels grade={MAO} tam={tam} visivel={visivel} />
        </g>
      )}
    </svg>
  );
};
