import { AbsoluteFill, random, useCurrentFrame } from "remotion";

// Fundo flat com gradiente e partículas suaves flutuando (estilo Kurzgesagt).
export const Fundo = ({ de, para, angulo = 160, particulas = 26, corParticula = "#ffffff", seed = "fundo" }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: `linear-gradient(${angulo}deg, ${de}, ${para ?? de})` }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920">
        {new Array(particulas).fill(0).map((_, i) => {
          const x = random(`${seed}-x-${i}`) * 1080;
          const y0 = random(`${seed}-y-${i}`) * 1920;
          const r = 3 + random(`${seed}-r-${i}`) * 9;
          const vel = 0.3 + random(`${seed}-v-${i}`) * 0.9;
          const y = (((y0 - frame * vel) % 1920) + 1920) % 1920;
          const brilho = 0.08 + 0.12 * (0.5 + 0.5 * Math.sin(frame / 12 + i));
          return <circle key={i} cx={x} cy={y} r={r} fill={corParticula} opacity={brilho} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
