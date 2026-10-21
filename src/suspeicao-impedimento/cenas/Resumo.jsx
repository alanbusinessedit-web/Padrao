import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { SI } from "../cores";

const LINHAS = [
  { rotulo: "NATUREZA", imp: "Objetiva", sus: "Subjetiva", frame: 15 },
  { rotulo: "CIVIL", imp: "CPC, art. 144", sus: "CPC, art. 145", frame: 40 },
  { rotulo: "PENAL", imp: "CPP, art. 252", sus: "CPP, art. 254", frame: 65 },
  { rotulo: "EXEMPLO", imp: "Parente na causa", sus: "Amigo íntimo", frame: 90 },
  { rotulo: "FORA DO PRAZO", imp: "Ainda pode ser alegado", sus: "Não pode mais", frame: 115 },
];

const Celula = ({ largura, cor, children, peso = 800, tamanho = 34 }) => (
  <div
    style={{
      width: largura,
      height: 112,
      borderRadius: 22,
      background: cor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 12px",
      fontWeight: peso,
      fontSize: tamanho,
      lineHeight: 1.1,
      color: SI.branco,
    }}
  >
    {children}
  </div>
);

const Macete = ({ top, texto, destaque, cor, inicio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 10 } });
  return (
    <div style={{ position: "absolute", top, width: "100%", display: "flex", justifyContent: "center", fontFamily }}>
      <div style={{ background: cor, borderRadius: 999, padding: "20px 44px", fontSize: 50, fontWeight: 900, color: SI.branco, transform: `scale(${s})` }}>
        {texto} = <span style={{ color: SI.penal }}>{destaque}</span>
      </div>
    </div>
  );
};

export const Resumo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cab = spring({ frame: frame - 6, fps, config: { damping: 13 } });

  return (
    <AbsoluteFill>
      <Fundo de={SI.fundo1} para={SI.fundo2} seed="si-resumo" />
      <CaixaTexto texto="RESUMO" atraso={2} top={150} tamanho={92} fundo="rgba(255,255,255,0.12)" />
      <div style={{ position: "absolute", top: 370, left: 40, right: 40, fontFamily, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 12, opacity: cab }}>
          <div style={{ width: 236 }} />
          <Celula largura={376} cor={SI.imp} peso={900}>IMPEDIMENTO</Celula>
          <Celula largura={376} cor={SI.sus} peso={900}>SUSPEIÇÃO</Celula>
        </div>
        {LINHAS.map((l, i) => {
          const s = spring({ frame: frame - l.frame, fps, config: { damping: 14 } });
          return (
            <div key={l.rotulo} style={{ display: "flex", gap: 12, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [i % 2 ? 300 : -300, 0])}px)` }}>
              <Celula largura={236} cor="rgba(255,255,255,0.1)" peso={900} tamanho={26}>{l.rotulo}</Celula>
              <Celula largura={376} cor="rgba(230,57,70,0.35)">{l.imp}</Celula>
              <Celula largura={376} cor="rgba(131,56,236,0.35)">{l.sus}</Celula>
            </div>
          );
        })}
      </div>
      <Macete top={1180} texto="IMPEDIMENTO" destaque="FATO" cor={SI.impEscuro} inicio={40} />
      <Macete top={1310} texto="SUSPEIÇÃO" destaque="RELAÇÃO" cor={SI.susEscuro} inicio={130} />
    </AbsoluteFill>
  );
};
