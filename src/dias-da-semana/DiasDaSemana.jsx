import { AbsoluteFill } from "remotion";
import { prepararCenas } from "../config";
import { VideoCenas } from "../components/VideoCenas";
import { SeloSerie } from "./Elementos";
import { Curiosidade } from "./cenas/Curiosidade";
import { Final } from "./cenas/Final";
import { Gancho } from "./cenas/Gancho";
import { Nome } from "./cenas/Nome";
import { Porque } from "./cenas/Porque";
import segunda from "./roteiros/segunda.json";
import terca from "./roteiros/terca.json";
import quarta from "./roteiros/quarta.json";
import quinta from "./roteiros/quinta.json";
import sexta from "./roteiros/sexta.json";
import sabado from "./roteiros/sabado.json";
import domingo from "./roteiros/domingo.json";

const CENAS = { gancho: Gancho, nome: Nome, porque: Porque, curiosidade: Curiosidade, final: Final };

// Uma série de 7 reels (1080x1920, 30fps), um por dia da semana, todos com o
// mesmo molde: gancho, origem do nome, por que existe, fato curioso e "próximo".
// O conteúdo de cada um fica em roteiros/<dia>.json.
const montar = (roteiro) => {
  const cenas = prepararCenas(roteiro);
  const componentes = Object.fromEntries(
    cenas.map((cena) => {
      const Cena = CENAS[cena.id];
      const ComSelo = () => (
        <AbsoluteFill>
          <Cena dia={roteiro} cena={cena} />
          <SeloSerie dia={roteiro} />
        </AbsoluteFill>
      );
      return [cena.id, ComSelo];
    }),
  );
  const Video = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => (
    <VideoCenas
      cenas={cenas}
      componentes={componentes}
      narracao={narracao}
      pastaNarracao={`narracao-${roteiro.id}`}
      arquivoNarracao={`audio-${roteiro.id}.mp3`}
      legendas={legendas}
      palavrasPorBloco={6}
      volume={volume}
    />
  );
  return { id: roteiro.id, cenas, Video };
};

export const DIAS = [segunda, terca, quarta, quinta, sexta, sabado, domingo].map(montar);

// "terca" -> "DiaTerca" (ids de composição só aceitam letras, números e hífen)
export const idComposicao = (id) => `Dia${id[0].toUpperCase()}${id.slice(1)}`;
