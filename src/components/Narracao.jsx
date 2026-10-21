import { Audio, Sequence, staticFile } from "remotion";

// Três modos de narração (prop `narracao` da composição):
//  - "nenhuma": vídeo sem áudio (padrão)
//  - "arquivo": um único arquivo em public/<arquivo>, tocado desde o frame 0
//  - "cenas":   um arquivo por cena em public/<pasta>/<id>.mp3 (gerados pelo
//               script do ElevenLabs), cada um começa exatamente no início da sua cena
export const Narracao = ({ modo, cenas, pasta = "narracao", arquivo = "audio.mp3", volume = 1 }) => {
  if (modo === "arquivo") {
    return <Audio src={staticFile(arquivo)} volume={volume} />;
  }

  if (modo === "cenas") {
    return (
      <>
        {cenas.filter((cena) => cena.narracao).map((cena) => (
          <Sequence key={cena.id} from={cena.from} durationInFrames={cena.duracao} layout="none">
            <Audio src={staticFile(`${pasta}/${cena.id}.mp3`)} volume={volume} />
          </Sequence>
        ))}
      </>
    );
  }

  return null;
};
