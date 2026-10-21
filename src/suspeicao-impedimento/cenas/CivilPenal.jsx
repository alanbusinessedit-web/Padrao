import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { Painel } from "../../components/Painel";
import { Pessoa } from "../../fascismo-comunismo/Icones";
import { SI } from "../cores";
import { Juiz } from "../Elementos";

// Juiz e advogado (de pasta) com um coração entre eles.
const AmigoDoAdvogado = () => {
  const frame = useCurrentFrame();
  const pulso = 1 + 0.12 * Math.sin(frame / 5);
  return (
    <g>
      <g transform="translate(95 300) scale(0.5)">
        <Juiz mesa={false} />
      </g>
      <Pessoa x={265} y={300} escala={1.9} cor={SI.pele} corRoupa={SI.toga} />
      <rect x={285} y={300} width={56} height={42} rx={8} fill={SI.madeira} />
      <g transform={`translate(180 120) scale(${pulso})`}>
        <path d="M 0 40 C -60 0 -50 -50 -20 -46 C -8 -44 0 -34 0 -26 C 0 -34 8 -44 20 -46 C 50 -50 60 0 0 40 Z" fill={SI.imp} />
      </g>
    </g>
  );
};

// Juiz e um "inimigo capital": raio entre os dois.
const InimigoCapital = () => {
  const frame = useCurrentFrame();
  const tremor = Math.sin(frame * 1.7) * 4;
  return (
    <g>
      <g transform="translate(95 300) scale(0.5)">
        <Juiz mesa={false} />
      </g>
      <g transform={`translate(${tremor} 0)`}>
        <Pessoa x={265} y={300} escala={1.9} cor={SI.pele} corRoupa={SI.impEscuro} />
        <path d="M 236 214 L 258 224" stroke={SI.toga} strokeWidth={6} strokeLinecap="round" />
        <path d="M 294 214 L 272 224" stroke={SI.toga} strokeWidth={6} strokeLinecap="round" />
      </g>
      <path d="M 196 70 L 160 150 L 192 150 L 166 230 L 230 130 L 196 130 L 222 70 Z" fill={SI.penal} />
    </g>
  );
};

export const CivilPenal = () => (
  <AbsoluteFill>
    <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-civpen" />
    <CaixaTexto texto="CIVIL X PENAL" atraso={4} top={170} tamanho={90} fundo="rgba(255,255,255,0.12)" />
    <Painel
      top={400}
      rotulo="PROCESSO CIVIL"
      cor={SI.civilEscuro}
      corEscura="#1d5f7a"
      atraso={125}
      de="esquerda"
      titulo="O ADVOGADO TAMBÉM CONTA"
      texto="Amizade ou inimizade com o advogado da parte gera suspeição"
    >
      <AmigoDoAdvogado />
    </Painel>
    <Painel
      top={960}
      rotulo="PROCESSO PENAL"
      cor="#bc6c25"
      corEscura="#8a4f1b"
      atraso={300}
      de="direita"
      titulo="INIMIGO CAPITAL"
      texto="E o juiz que responde a processo por fato parecido"
    >
      <InimigoCapital />
    </Painel>
  </AbsoluteFill>
);
