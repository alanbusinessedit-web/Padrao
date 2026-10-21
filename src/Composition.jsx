import { AbsoluteFill, Sequence } from "remotion";
import { CENAS, TRANSICAO } from "./config";
import { Legenda } from "./components/Legenda";
import { Narracao } from "./components/Narracao";
import { Transicao } from "./components/Transicao";
import { Cena1Votos } from "./cenas/Cena1Votos";
import { Cena2Offline } from "./cenas/Cena2Offline";
import { Cena3Criptografia } from "./cenas/Cena3Criptografia";
import { Cena4Boletim } from "./cenas/Cena4Boletim";
import { Cena5Transparencia } from "./cenas/Cena5Transparencia";

const COMPONENTES = {
  cena1: Cena1Votos,
  cena2: Cena2Offline,
  cena3: Cena3Criptografia,
  cena4: Cena4Boletim,
  cena5: Cena5Transparencia,
};

// "Como Funciona o Voto no Brasil" — 30s, 1080x1920, 30fps.
// Cada cena começa exatamente no frame definido em roteiro.json. A cena seguinte
// é desenhada por cima com uma transição circular, então a anterior fica visível
// por mais TRANSICAO frames, só por baixo do círculo.
export const VotoBrasil = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {CENAS.map((cena, i) => {
        const Cena = COMPONENTES[cena.id];
        const ultima = i === CENAS.length - 1;
        return (
          <Sequence
            key={cena.id}
            name={`${cena.id}: ${cena.titulo}`}
            from={cena.from}
            durationInFrames={cena.duracao + (ultima ? 0 : TRANSICAO)}
          >
            <Transicao ativa={i > 0}>
              <Cena />
              {legendas && <Legenda texto={cena.narracao} fim={cena.duracao - 15} />}
            </Transicao>
          </Sequence>
        );
      })}
      <Narracao modo={narracao} volume={volume} />
    </AbsoluteFill>
  );
};
