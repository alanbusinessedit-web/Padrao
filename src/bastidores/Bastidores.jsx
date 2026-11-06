import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { prepararCenas } from "../config";
import { Legenda } from "../components/Legenda";
import { Narracao } from "../components/Narracao";
import { Cenas, Gancho, Narrador, Roteiro, Siga, Tema, Voz } from "./Cenas";
import { Fundo, Moldura, Titulo } from "./Elementos";
import roteiro from "./roteiro.json";

export const CENAS_BASTIDORES = prepararCenas(roteiro);

const COMPONENTES = { gancho: Gancho, narrador: Narrador, voz: Voz, tema: Tema, roteiro: Roteiro, cenas: Cenas, siga: Siga };

// Cada cena entra com um leve "tranco" de câmera (corte seco, como no estilo de referência).
const Cena = ({ cena, legendas }) => {
  const frame = useCurrentFrame();
  const Conteudo = COMPONENTES[cena.id];
  const escala = interpolate(frame, [0, 7], [1.035, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `scale(${escala})` }}>
      <Titulo linha1={cena.titulo[0]} linha2={cena.titulo[1]} />
      <Conteudo />
      {legendas && cena.narracao && <Legenda texto={cena.narracao} fim={cena.duracao - 8} palavrasPorBloco={5} />}
    </AbsoluteFill>
  );
};

// "Bastidores: como nasce um vídeo" (Narrando o Direito) — 28,5s, 1080x1920, 30fps.
// Os títulos já fazem papel de legenda, então a legenda de rodapé vem desligada.
export const Bastidores = ({ narracao = "nenhuma", legendas = false, volume = 1 }) => (
  <AbsoluteFill>
    <Fundo />
    {CENAS_BASTIDORES.map((cena) => (
      <Sequence key={cena.id} name={`${cena.id}: ${cena.titulo.join(" ")}`} from={cena.from} durationInFrames={cena.duracao}>
        <Cena cena={cena} legendas={legendas} />
      </Sequence>
    ))}
    <Moldura />
    <Narracao modo={narracao} cenas={CENAS_BASTIDORES} pasta="narracao-bastidores" arquivo="audio-bastidores.mp3" volume={volume} />
  </AbsoluteFill>
);
