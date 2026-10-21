import { useCurrentFrame, AbsoluteFill } from "remotion";

export const MinhaCena = () => {
  const frame = useCurrentFrame(); // Qual é o frame atual? (0, 1, 2...)

  // Mover o elemento baseando-se no frame
  const opacity = Math.min(1, frame / 30); // Surge durante 1 segundo

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: "#ff5e62",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: 120, fontFamily: "sans-serif" }}>
        Eleições no Brasil
      </h1>
    </AbsoluteFill>
  );
};
