import { prepararCenas } from "../config";
import { VideoCenas } from "../components/VideoCenas";
import roteiro from "./roteiro.json";
import { Comum } from "./cenas/Comum";
import { Economia } from "./cenas/Economia";
import { Final } from "./cenas/Final";
import { Gancho } from "./cenas/Gancho";
import { Ideia } from "./cenas/Ideia";
import { Origens } from "./cenas/Origens";
import { Resumo } from "./cenas/Resumo";
import { Visao } from "./cenas/Visao";

export const CENAS_FC = prepararCenas(roteiro);

const COMPONENTES = {
  gancho: Gancho,
  origens: Origens,
  ideia: Ideia,
  economia: Economia,
  visao: Visao,
  comum: Comum,
  resumo: Resumo,
  final: Final,
};

// "Fascismo x Comunismo: você sabe diferenciar?" — 85s, 1080x1920, 30fps.
export const FascismoComunismo = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => (
  <VideoCenas
    cenas={CENAS_FC}
    componentes={COMPONENTES}
    narracao={narracao}
    pastaNarracao="narracao-fascismo-comunismo"
    arquivoNarracao="audio-fascismo-comunismo.mp3"
    legendas={legendas}
    palavrasPorBloco={6}
    volume={volume}
  />
);
