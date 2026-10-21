import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { Pessoa } from "../Icones";
import { Painel } from "../../components/Painel";

// Pirâmide de classes que desce até todos ficarem no mesmo nível.
const LutaDeClasses = () => {
  const frame = useCurrentFrame();
  const nivela = interpolate(frame, [80, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const altura = 150 * (1 - nivela);
  return (
    <g>
      <rect x={130} y={300 - altura} width={100} height={altura} rx={10} fill={FC.comEscuro} />
      <Pessoa x={180} y={262 - altura} escala={1.2} cor={FC.pele} corRoupa={FC.fasEscuro} cartola={nivela < 0.5} />
      {[50, 100, 260, 310].map((x, i) => (
        <Pessoa key={x} x={x} y={262 - Math.max(0, Math.sin(frame / 5 + i)) * 8 * (1 - nivela)} escala={1.2} cor={FC.pele} corRoupa={FC.creme} />
      ))}
      <rect x={20} y={300} width={320} height={14} rx={7} fill={FC.comEscuro} />
    </g>
  );
};

// Pessoas espalhadas que se alinham em fileiras sob uma grande bandeira.
const NacaoAcimaDeTudo = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [250, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const onda = Math.sin(frame / 6) * 10;
  return (
    <g>
      <rect x={176} y={20} width={10} height={170} rx={5} fill={FC.fasClaro} />
      <path d={`M 186 26 Q 236 ${16 + onda} 286 26 Q 316 ${36 - onda} 336 26 L 336 106 Q 316 ${116 - onda} 286 106 Q 236 ${96 + onda} 186 106 Z`} fill={FC.ouro} />
      {new Array(12).fill(0).map((_, i) => {
        const c = i % 6;
        const l = Math.floor(i / 6);
        const xf = 45 + c * 54;
        const yf = 250 + l * 70;
        const xi = 30 + random(`n-x-${i}`) * 300;
        const yi = 200 + random(`n-y-${i}`) * 160;
        return (
          <Pessoa key={i} x={interpolate(t, [0, 1], [xi, xf])} y={interpolate(t, [0, 1], [yi, yf])} escala={0.75} cor={FC.pele} corRoupa={FC.fasEscuro} />
        );
      })}
    </g>
  );
};

export const Ideia = () => (
  <AbsoluteFill>
    <Fundo de={FC.fundo1} para={FC.fundo2} seed="ideia" />
    <CaixaTexto texto="A IDEIA CENTRAL" atraso={4} top={170} tamanho={72} fundo="rgba(255,255,255,0.12)" />
    <Painel top={400} rotulo="COMUNISMO" cor={FC.com} corEscura={FC.comEscuro} atraso={10} de="esquerda" titulo="LUTA DE CLASSES" texto="Objetivo final: uma sociedade sem classes">
      <LutaDeClasses />
    </Painel>
    <Painel top={960} rotulo="FASCISMO" cor={FC.fas} corEscura={FC.fasEscuro} atraso={215} de="direita" titulo="A NAÇÃO ACIMA DE TUDO" texto="O indivíduo existe para servir à nação e ao Estado">
      <NacaoAcimaDeTudo />
    </Painel>
  </AbsoluteFill>
);
