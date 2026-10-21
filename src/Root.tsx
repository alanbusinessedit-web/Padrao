import { Composition } from "remotion";
import { MinhaCena } from "./MinhaCena";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MinhaCena"
      component={MinhaCena}
      durationInFrames={90} // 3 segundos a 30 fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
