import { Audio, Sequence, staticFile } from "remotion";
import { CENAS } from "../config";

// Três modos de narração (prop `narracao` da composição):
//  - "nenhuma": vídeo sem áudio (padrão)
//  - "arquivo": um único public/audio.mp3, tocado desde o frame 0
//  - "cenas":   um arquivo por cena em public/narracao/<id>.mp3 (gerados pelo
//               script do ElevenLabs), cada um começa exatamente no início da sua cena
export const Narracao = ({ modo, volume = 1 }) => {
  if (modo === "arquivo") {
    return <Audio src={staticFile("audio.mp3")} volume={volume} />;
  }

  if (modo === "cenas") {
    return (
      <>
        {CENAS.map((cena) => (
          <Sequence key={cena.id} from={cena.from} durationInFrames={cena.duracao} layout="none">
            <Audio src={staticFile(`narracao/${cena.id}.mp3`)} volume={volume} />
          </Sequence>
        ))}
      </>
    );
  }

  return null;
};
