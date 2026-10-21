import { prepararCenas } from "../config";
import { VideoCenas } from "../components/VideoCenas";
import roteiro from "./roteiro.json";
import { CivilPenal } from "./cenas/CivilPenal";
import { Consequencias } from "./cenas/Consequencias";
import { ForoIntimo } from "./cenas/ForoIntimo";
import { Gancho } from "./cenas/Gancho";
import { Imparcialidade } from "./cenas/Imparcialidade";
import { Impedimento } from "./cenas/Impedimento";
import { Marca } from "./cenas/Marca";
import { Pegadinha } from "./cenas/Pegadinha";
import { Prazo } from "./cenas/Prazo";
import { Resumo } from "./cenas/Resumo";
import { Suspeicao } from "./cenas/Suspeicao";

export const CENAS_SI = prepararCenas(roteiro);

const COMPONENTES = {
  gancho: Gancho,
  imparcialidade: Imparcialidade,
  impedimento: Impedimento,
  suspeicao: Suspeicao,
  civilPenal: CivilPenal,
  foroIntimo: ForoIntimo,
  prazo: Prazo,
  pegadinha: Pegadinha,
  consequencias: Consequencias,
  resumo: Resumo,
  marca: Marca,
};

// "Suspeição x Impedimento" (Narrando o Direito) — 129s, 1080x1920, 30fps.
export const SuspeicaoImpedimento = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => (
  <VideoCenas
    cenas={CENAS_SI}
    componentes={COMPONENTES}
    narracao={narracao}
    pastaNarracao="narracao-suspeicao-impedimento"
    arquivoNarracao="audio-suspeicao-impedimento.mp3"
    legendas={legendas}
    palavrasPorBloco={6}
    volume={volume}
  />
);
