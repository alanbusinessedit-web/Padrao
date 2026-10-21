import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { Pessoa } from "../Icones";
import { Painel } from "../../components/Painel";

// Globo com pessoas de mãos dadas girando em volta.
const Internacional = () => {
  const frame = useCurrentFrame();
  const giro = frame * 0.8;
  return (
    <g transform="translate(180 200)">
      <circle r={120} fill={FC.ciano} />
      <path d="M -60 -80 Q -20 -60 -40 -20 Q -80 0 -50 40 Q -20 60 -30 100 L -70 70 Q -110 20 -90 -40 Z" fill={FC.verde} />
      <path d="M 30 -100 Q 70 -70 50 -30 Q 90 -10 80 40 Q 50 60 40 20 Q 10 -20 20 -60 Z" fill={FC.verde} />
      <ellipse rx={120} ry={40} fill="none" stroke={FC.branco} strokeWidth={4} opacity={0.4} />
      {new Array(8).fill(0).map((_, i) => {
        const a = ((i * 45 + giro) * Math.PI) / 180;
        return (
          <g key={i} transform={`rotate(${i * 45 + giro}) translate(0 -150)`}>
            <Pessoa escala={0.6} cor={FC.pele} corRoupa={i % 2 ? FC.creme : FC.ouro} />
          </g>
        );
      })}
    </g>
  );
};

// Bandeira grande tremulando, muro e punho fechado.
const Ultranacionalismo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const onda = Math.sin(frame / 6) * 14;
  const punho = spring({ frame: frame - 190, fps, config: { damping: 8 } });
  return (
    <g>
      <rect x={60} y={20} width={14} height={270} rx={7} fill={FC.fasClaro} />
      <path
        d={`M 74 30 Q 150 ${10 + onda} 220 30 Q 280 ${50 - onda} 330 30 L 330 160 Q 280 ${180 - onda} 220 160 Q 150 ${140 + onda} 74 160 Z`}
        fill={FC.ouro}
      />
      <circle cx={200} cy={95} r={34} fill={FC.fasEscuro} opacity={0.35} />
      {new Array(3).fill(0).map((_, l) =>
        new Array(5).fill(0).map((__, c) => (
          <rect key={`${l}-${c}`} x={20 + c * 66 + (l % 2) * 33} y={290 + l * 30} width={60} height={24} rx={4} fill={FC.fasEscuro} />
        )),
      )}
      <g transform={`translate(285 245) scale(${punho})`}>
        <rect x={-34} y={-30} width={68} height={56} rx={16} fill={FC.pele} />
        {[-24, -8, 8, 24].map((dx) => (
          <rect key={dx} x={dx - 8} y={-42} width={16} height={24} rx={8} fill={FC.pele} />
        ))}
        <rect x={-24} y={26} width={48} height={30} rx={6} fill={FC.fasEscuro} />
      </g>
    </g>
  );
};

export const Visao = () => (
  <AbsoluteFill>
    <Fundo de={FC.fundo1} para={FC.fundo2} seed="visao" />
    <CaixaTexto texto="VISÃO DE MUNDO" atraso={4} top={170} tamanho={72} fundo="rgba(255,255,255,0.12)" />
    <Painel top={400} rotulo="COMUNISMO" cor={FC.com} corEscura={FC.comEscuro} atraso={10} de="esquerda" titulo="INTERNACIONALISTA" texto="Adversário: a burguesia, em qualquer país">
      <Internacional />
    </Painel>
    <Painel top={960} rotulo="FASCISMO" cor={FC.fas} corEscura={FC.fasEscuro} atraso={150} de="direita" titulo="ULTRANACIONALISTA" texto="Exalta a força e combate o comunismo e o liberalismo">
      <Ultranacionalismo />
    </Painel>
  </AbsoluteFill>
);
