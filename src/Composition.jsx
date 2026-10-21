import { CENAS } from "./config";
import { VideoCenas } from "./components/VideoCenas";
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
export const VotoBrasil = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => (
  <VideoCenas
    cenas={CENAS}
    componentes={COMPONENTES}
    narracao={narracao}
    pastaNarracao="narracao"
    arquivoNarracao="audio.mp3"
    legendas={legendas}
    volume={volume}
  />
);
