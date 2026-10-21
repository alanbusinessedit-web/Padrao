import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { IconeComunismo, IconeFascismo } from "../Icones";

export const Final = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icones = spring({ frame: frame - 6, fps, config: { damping: 10 } });
  const check = spring({ frame: frame - 30, fps, config: { damping: 8, stiffness: 160 } });
  const siga = spring({ frame: frame - 90, fps, config: { damping: 10 } });
  const pulso = 1 + 0.05 * Math.sin(frame / 5);

  return (
    <AbsoluteFill>
      <Fundo de={FC.fundo1} para={FC.fundo2} seed="final" corParticula={FC.ouro} />
      <CaixaTexto texto="AGORA VOCÊ SABE DIFERENCIAR" atraso={10} top={260} tamanho={84} fundo="rgba(6,214,160,0.22)" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(260 900) scale(${icones})`}>
          <circle r={160} fill={FC.com} />
          <g transform="scale(1.1)">
            <IconeComunismo />
          </g>
        </g>
        <g transform={`translate(820 900) scale(${icones})`}>
          <circle r={160} fill={FC.fas} />
          <g transform="scale(1.1)">
            <IconeFascismo />
          </g>
        </g>
        <g transform={`translate(540 1150) scale(${check})`}>
          <circle r={90} fill={FC.verde} />
          <path d="M -40 2 L -10 32 L 44 -28" stroke={FC.branco} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
      <div style={{ position: "absolute", top: 1300, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 54,
            color: FC.fundo1,
            background: FC.ouro,
            padding: "26px 56px",
            borderRadius: 999,
            transform: `scale(${siga * pulso})`,
            opacity: siga,
          }}
        >
          SIGA PARA MAIS
        </div>
      </div>
    </AbsoluteFill>
  );
};
