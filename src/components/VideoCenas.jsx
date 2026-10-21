import { AbsoluteFill, Sequence } from "remotion";
import { TRANSICAO } from "../config";
import { Legenda } from "./Legenda";
import { Narracao } from "./Narracao";
import { Transicao } from "./Transicao";

// Monta um vídeo a partir de uma lista de cenas (de um roteiro.json) e dos
// componentes de cada cena. Cada cena começa exatamente no seu frame; a seguinte
// é desenhada por cima com a transição circular, então a anterior continua
// visível por mais TRANSICAO frames, só por baixo do círculo.
export const VideoCenas = ({
  cenas,
  componentes,
  narracao = "nenhuma",
  pastaNarracao,
  arquivoNarracao,
  legendas = true,
  palavrasPorBloco,
  volume = 1,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {cenas.map((cena, i) => {
        const Cena = componentes[cena.id];
        const ultima = i === cenas.length - 1;
        return (
          <Sequence
            key={cena.id}
            name={`${cena.id}: ${cena.titulo}`}
            from={cena.from}
            durationInFrames={cena.duracao + (ultima ? 0 : TRANSICAO)}
          >
            <Transicao ativa={i > 0}>
              <Cena />
              {legendas && cena.narracao && <Legenda texto={cena.narracao} fim={cena.duracao - 15} palavrasPorBloco={palavrasPorBloco} />}
            </Transicao>
          </Sequence>
        );
      })}
      <Narracao modo={narracao} cenas={cenas} pasta={pastaNarracao} arquivo={arquivoNarracao} volume={volume} />
    </AbsoluteFill>
  );
};
