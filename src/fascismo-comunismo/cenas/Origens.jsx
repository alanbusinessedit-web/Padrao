import { AbsoluteFill } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { Painel } from "../Painel";

// Busto estilizado de Marx: cabelo e barba volumosos.
const BustoMarx = () => (
  <g transform="translate(180 210)">
    <path d="M -120 170 Q -120 70 0 70 Q 120 70 120 170 Z" fill={FC.fasEscuro} />
    <circle cx={0} cy={-40} r={96} fill={FC.creme} />
    <circle cx={0} cy={-30} r={70} fill={FC.pele} />
    <path d="M -78 -10 Q -90 120 0 130 Q 90 120 78 -10 Q 40 40 0 40 Q -40 40 -78 -10 Z" fill={FC.creme} />
    <circle cx={-24} cy={-40} r={7} fill={FC.fasEscuro} />
    <circle cx={24} cy={-40} r={7} fill={FC.fasEscuro} />
  </g>
);

// Busto estilizado de Mussolini: careca, queixo marcado, farda escura.
const BustoMussolini = () => (
  <g transform="translate(180 210)">
    <path d="M -120 170 Q -120 70 0 70 Q 120 70 120 170 Z" fill={FC.fasEscuro} />
    <rect x={-30} y={70} width={60} height={40} fill={FC.fasClaro} />
    <path d="M -72 -60 Q -72 -140 0 -140 Q 72 -140 72 -60 L 64 20 Q 50 70 0 70 Q -50 70 -64 20 Z" fill={FC.pele} />
    <circle cx={-26} cy={-40} r={7} fill={FC.fasEscuro} />
    <circle cx={26} cy={-40} r={7} fill={FC.fasEscuro} />
    <rect x={-22} y={20} width={44} height={9} rx={4} fill={FC.fasEscuro} />
  </g>
);

export const Origens = () => (
  <AbsoluteFill>
    <Fundo de={FC.fundo1} para={FC.fundo2} seed="origens" />
    <CaixaTexto texto="ORIGENS" atraso={4} top={170} tamanho={96} fundo="rgba(255,255,255,0.12)" />
    <Painel
      top={400}
      rotulo="COMUNISMO"
      cor={FC.com}
      corEscura={FC.comEscuro}
      atraso={10}
      de="esquerda"
      titulo="KARL MARX"
      texto="1848 • Manifesto Comunista, com Friedrich Engels"
    >
      <BustoMarx />
    </Painel>
    <Painel
      top={960}
      rotulo="FASCISMO"
      cor={FC.fas}
      corEscura={FC.fasEscuro}
      atraso={140}
      de="direita"
      titulo="BENITO MUSSOLINI"
      texto="1919 • Itália, logo após a Primeira Guerra Mundial"
    >
      <BustoMussolini />
    </Painel>
  </AbsoluteFill>
);
