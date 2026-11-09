import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { BRANCO, Cartoes } from "../Elementos";
import { Icone } from "../Icones";

// Ilustração principal: um ícone grande, ou dois ícones com "=" entre eles.
export const Visual = ({ visual, dia, top = 690 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mola = (inicio) => spring({ frame: frame - inicio, fps, config: { damping: 10 } });
  const flutua = Math.sin(frame / 14) * 10;

  if (visual.tipo === "par") {
    const igual = mola(30);
    return (
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        {visual.icones.map((nome, i) => {
          const s = mola(6 + i * 14);
          const x = i === 0 ? 270 : 810;
          return (
            <g key={nome} transform={`translate(${x} ${top + (i ? -flutua : flutua)}) scale(${s})`}>
              <circle r={210} fill="rgba(0,0,0,0.25)" stroke={dia.cores.cor} strokeWidth={10} />
              <g transform="scale(0.95)">
                <Icone nome={nome} />
              </g>
              <text y={290} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={56} fill={BRANCO} letterSpacing={3}>
                {visual.rotulos[i]}
              </text>
            </g>
          );
        })}
        <text x={540} y={top + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={130 * igual} fill={dia.cores.cor}>
          =
        </text>
      </svg>
    );
  }

  const s = mola(6);
  return (
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
      <g transform={`translate(540 ${top + flutua}) scale(${1.25 * s}) rotate(${interpolate(s, [0, 1], [-25, 0])})`}>
        <circle r={210} fill="rgba(0,0,0,0.25)" stroke={dia.cores.cor} strokeWidth={8} />
        <Icone nome={visual.icone} />
      </g>
    </svg>
  );
};

export const Porque = ({ dia, cena }) => {
  const cards = cena.cards?.length ?? 0;
  const topoCards = cards >= 3 ? 1060 : 1120;
  const topoVisual = cena.visual.tipo === "par" ? 660 : 700;
  return (
    <AbsoluteFill>
      <Fundo de={dia.cores.fundo1} para={dia.cores.fundo2} seed={`${dia.id}-porque`} corParticula={dia.cores.cor} />
      <CaixaTexto texto={cena.titulo} atraso={2} top={160} tamanho={78} fundo="rgba(0,0,0,0.25)" />
      <Visual visual={cena.visual} dia={dia} top={topoVisual} />
      <Cartoes cena={cena} cor={dia.cores.cor} top={topoCards} />
    </AbsoluteFill>
  );
};
