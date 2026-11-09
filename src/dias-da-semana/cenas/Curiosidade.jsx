import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { BRANCO, Cartoes, ESCURO } from "../Elementos";
import { VISUAIS } from "../Visuais";
import { Visual } from "./Porque";

// Selo "!" girando ao lado do título.
const Exclamacao = ({ cor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 18, fps, config: { damping: 7, stiffness: 160 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        right: 70,
        width: 110,
        height: 110,
        borderRadius: 999,
        background: cor,
        color: ESCURO,
        fontFamily,
        fontWeight: 900,
        fontSize: 84,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${s}) rotate(${Math.sin(frame / 6) * 12}deg)`,
      }}
    >
      !
    </div>
  );
};

export const Curiosidade = ({ dia, cena }) => {
  const Especial = VISUAIS[cena.visual.tipo];
  return (
    <AbsoluteFill>
      <Fundo de={dia.cores.fundo2} para={dia.cores.fundo1} seed={`${dia.id}-curiosidade`} corParticula={dia.cores.cor} particulas={36} />
      <CaixaTexto texto={cena.titulo} atraso={2} top={160} tamanho={cena.titulo.length > 14 ? 66 : 80} fundo="rgba(0,0,0,0.3)" cor={BRANCO} />
      <Exclamacao cor={dia.cores.cor} />
      {Especial ? <Especial visual={cena.visual} dia={dia} cena={cena} /> : <Visual visual={cena.visual} dia={dia} top={700} />}
      <Cartoes cena={cena} cor={dia.cores.cor} top={cena.visual.tipo === "samoa" ? 1260 : 1060} />
    </AbsoluteFill>
  );
};
