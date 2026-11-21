import { prepararCenas } from "../config";
import { VideoCenas } from "../components/VideoCenas";
import roteiro from "./roteiro.json";
import { Contador } from "./Elementos";
import { Efeitos } from "./Efeitos";
import { Contexto } from "./cenas/Contexto";
import { Gancho } from "./cenas/Gancho";
import { Mae } from "./cenas/Mae";
import { Mensagem } from "./cenas/Mensagem";
import { Olhar } from "./cenas/Olhar";
import { Tentativa } from "./cenas/Tentativa";
import { Twist } from "./cenas/Twist";
import { Voto } from "./cenas/Voto";

export const CENAS_PC = prepararCenas(roteiro);

const CENAS = { gancho: Gancho, contexto: Contexto, mensagem: Mensagem, tentativa: Tentativa, mae: Mae, olhar: Olhar, twist: Twist, voto: Voto };

// Regra 1 da série: o contador (DIAS | SALDO | SUSPEITA) aparece em TODAS as cenas.
// Os valores vêm do `hud` de cada cena no roteiro.json. No twist, o painel treme.
const COMPONENTES = Object.fromEntries(
  CENAS_PC.map((cena) => {
    const Cena = CENAS[cena.id];
    const Com = () => (
      <>
        <Cena />
        <Contador {...cena.hud} alerta={cena.id === "twist" ? 1 : 0} />
      </>
    );
    return [cena.id, Com];
  }),
);

// "O PIX do Caio" — Episódio 1. 60s, 1080x1920, 30fps.
export const PixDoCaio = ({ narracao = "nenhuma", legendas = true, volume = 1 }) => (
  <>
  <VideoCenas
    cenas={CENAS_PC}
    componentes={COMPONENTES}
    narracao={narracao}
    pastaNarracao="narracao-pix-do-caio"
    arquivoNarracao="audio-pix-do-caio.mp3"
    legendas={legendas}
    palavrasPorBloco={5}
    volume={volume}
  />
  <Efeitos cenas={CENAS_PC} />
  </>
);
