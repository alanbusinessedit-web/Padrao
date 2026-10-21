import { AbsoluteFill } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";
import { Etiqueta, IconeAlvo, IconeConselho, IconeCoracao, IconeMoeda, Item, SeloLei } from "../Elementos";

export const Suspeicao = () => (
  <AbsoluteFill>
    <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-sus" corParticula={SI.sus} />
    <CaixaTexto texto="SUSPEIÇÃO" atraso={4} top={160} tamanho={96} fundo={SI.sus} />
    <Etiqueta texto="SUBJETIVO" cor={SI.susEscuro} top={390} inicio={30} />
    <SeloLei codigo="CPC" artigo="art. 145" cor={SI.civil} x={90} y={530} inicio={65} />
    <SeloLei codigo="CPP" artigo="art. 254" cor={SI.penal} x={570} y={530} inicio={85} />
    <Item top={670} cor={SI.sus} inicio={135} titulo="Amizade íntima ou inimizade">
      <IconeCoracao />
    </Item>
    <Item top={875} cor={SI.sus} inicio={195} titulo="Credor ou devedor de uma parte">
      <IconeMoeda />
    </Item>
    <Item top={1080} cor={SI.sus} inicio={270} titulo="Aconselhou alguma das partes">
      <IconeConselho />
    </Item>
    <Item top={1285} cor={SI.sus} inicio={325} titulo="Interesse no resultado">
      <IconeAlvo />
    </Item>
  </AbsoluteFill>
);
