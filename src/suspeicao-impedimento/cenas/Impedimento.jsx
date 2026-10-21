import { AbsoluteFill } from "remotion";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";
import { Etiqueta, IconeFamilia, IconePasta, IconeVoltar, Item, SeloLei } from "../Elementos";

export const Impedimento = () => (
  <AbsoluteFill>
    <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-imp" corParticula={SI.imp} />
    <CaixaTexto texto="IMPEDIMENTO" atraso={4} top={160} tamanho={96} fundo={SI.imp} />
    <Etiqueta texto="OBJETIVO" cor={SI.impEscuro} top={390} inicio={30} />
    <SeloLei codigo="CPC" artigo="art. 144" cor={SI.civil} x={90} y={530} inicio={80} />
    <SeloLei codigo="CPP" artigo="art. 252" cor={SI.penal} x={570} y={530} inicio={100} />
    <Item top={680} cor={SI.imp} inicio={225} titulo="Juiz, cônjuge ou parente até 3º grau" texto="é parte no processo">
      <IconeFamilia />
    </Item>
    <Item top={900} cor={SI.imp} inicio={335} titulo="Parente atua no processo" texto="advogado, promotor, perito…">
      <IconePasta />
    </Item>
    <Item top={1120} cor={SI.imp} inicio={425} titulo="O juiz já atuou na causa" texto="advogado, promotor, testemunha ou outra instância">
      <IconeVoltar />
    </Item>
  </AbsoluteFill>
);
