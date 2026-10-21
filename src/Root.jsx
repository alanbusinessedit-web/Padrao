import { Composition } from "remotion";
import { ALTURA, DURACAO_TOTAL, FPS, LARGURA, duracaoTotal } from "./config";
import { VotoBrasil } from "./Composition";
import { MinhaCena } from "./MinhaCena";
import { CENAS_FC, FascismoComunismo } from "./fascismo-comunismo/FascismoComunismo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="VotoBrasil"
        component={VotoBrasil}
        durationInFrames={DURACAO_TOTAL} // 900 frames = 30s
        fps={FPS}
        width={LARGURA}
        height={ALTURA}
        defaultProps={{
          narracao: "nenhuma", // "nenhuma" | "arquivo" (public/audio.mp3) | "cenas" (public/narracao/*.mp3)
          legendas: true,
          volume: 1,
        }}
      />
      <Composition
        id="FascismoComunismo"
        component={FascismoComunismo}
        durationInFrames={duracaoTotal(CENAS_FC)} // 2550 frames = 85s
        fps={FPS}
        width={LARGURA}
        height={ALTURA}
        defaultProps={{ narracao: "nenhuma", legendas: true, volume: 1 }}
      />
      <Composition
        id="MinhaCena"
        component={MinhaCena}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
