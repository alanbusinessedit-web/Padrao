import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TRANSICAO } from "../config";

// Revela a cena com um círculo que cresce do centro, por cima da cena anterior.
// A cena começa exatamente no seu frame de início; o círculo cobre a tela em TRANSICAO frames.
export const Transicao = ({ children, ativa = true }) => {
  const frame = useCurrentFrame();
  if (!ativa) return <AbsoluteFill>{children}</AbsoluteFill>;

  const raio = interpolate(frame, [0, TRANSICAO], [0, 120], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return <AbsoluteFill style={{ clipPath: `circle(${raio}% at 50% 50%)` }}>{children}</AbsoluteFill>;
};
