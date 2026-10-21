import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { Pessoa } from "../Icones";
import { Painel } from "../../components/Painel";

const Fabrica = ({ x, y, cor, corTelhado }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={150} y={-40} width={36} height={130} rx={6} fill={corTelhado} />
    <path d="M 0 90 L 0 20 L 60 50 L 60 20 L 120 50 L 120 20 L 200 60 L 200 190 L 0 190 Z" fill={cor} />
    {[30, 90, 150].map((wx) => (
      <rect key={wx} x={wx - 16} y={110} width={32} height={40} rx={6} fill={FC.ouro} />
    ))}
  </g>
);

// Etiqueta "PRIVADA" carimbada com um X; uma estrela sobe sobre a fábrica.
const PropriedadeColetiva = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const x = spring({ frame: frame - 70, fps, config: { damping: 8 } });
  const estrela = spring({ frame: frame - 100, fps, config: { damping: 10 } });
  const fumaca = (frame / 2) % 60;
  return (
    <g>
      <circle cx={248} cy={50 - fumaca} r={14 + fumaca / 4} fill={FC.creme} opacity={0.6 * (1 - fumaca / 60)} />
      <Fabrica x={80} y={100} cor={FC.creme} corTelhado={FC.comClaro} />
      <g transform="translate(110 340)">
        <rect x={-90} y={-30} width={180} height={56} rx={14} fill={FC.branco} />
        <text x={0} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={32} fill={FC.comEscuro}>
          PRIVADA
        </text>
        <g transform={`scale(${x})`}>
          <rect x={-100} y={-8} width={200} height={16} rx={8} fill={FC.fasEscuro} transform="rotate(20)" />
          <rect x={-100} y={-8} width={200} height={16} rx={8} fill={FC.fasEscuro} transform="rotate(-20)" />
        </g>
      </g>
      <g transform={`translate(180 ${interpolate(estrela, [0, 1], [190, 70])}) scale(${estrela})`}>
        <path d="M 0 -40 L 11 -13 L 40 -12 L 17 6 L 25 34 L 0 18 L -25 34 L -17 6 L -40 -12 L -11 -13 Z" fill={FC.ouro} />
      </g>
    </g>
  );
};

// O Estado (prédio com colunas) controla a fábrica e o dono por "fios".
const ControleDoEstado = () => {
  const frame = useCurrentFrame();
  const fios = interpolate(frame, [240, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const balanco = Math.sin(frame / 8) * 4 * fios;
  return (
    <g>
      <g transform="translate(180 10)">
        <path d="M -110 40 L 0 -10 L 110 40 Z" fill={FC.ouro} />
        <rect x={-100} y={40} width={200} height={14} fill={FC.ouro} />
        {[-75, -38, 0, 38, 75].map((cx) => (
          <rect key={cx} x={cx - 9} y={56} width={18} height={60} fill={FC.fasClaro} />
        ))}
        <rect x={-110} y={116} width={220} height={14} fill={FC.ouro} />
      </g>
      {[[90, 230], [215, 230], [300, 240]].map(([fx, fy], i) => (
        <line key={i} x1={180} y1={140} x2={180 + (fx - 180) * fios} y2={140 + (fy - 140) * fios} stroke={FC.ouro} strokeWidth={4} strokeDasharray="10 8" />
      ))}
      <g transform={`rotate(${balanco} 150 230)`}>
        <Fabrica x={40} y={180} cor={FC.fasClaro} corTelhado={FC.fasEscuro} />
      </g>
      <g transform={`translate(0 ${balanco})`}>
        <Pessoa x={300} y={330} escala={1.1} cor={FC.pele} corRoupa={FC.fasEscuro} cartola />
      </g>
    </g>
  );
};

export const Economia = () => (
  <AbsoluteFill>
    <Fundo de={FC.fundo1} para={FC.fundo2} seed="economia" />
    <CaixaTexto texto="ECONOMIA" atraso={4} top={170} tamanho={96} fundo="rgba(255,255,255,0.12)" />
    <Painel top={400} rotulo="COMUNISMO" cor={FC.com} corEscura={FC.comEscuro} atraso={10} de="esquerda" titulo="FIM DA PROPRIEDADE PRIVADA" texto="dos meios de produção: fábricas, terras e bancos">
      <PropriedadeColetiva />
    </Painel>
    <Painel top={960} rotulo="FASCISMO" cor={FC.fas} corEscura={FC.fasEscuro} atraso={165} de="direita" titulo="EMPRESAS PRIVADAS" texto="mantidas, mas sob o comando do Estado">
      <ControleDoEstado />
    </Painel>
  </AbsoluteFill>
);
