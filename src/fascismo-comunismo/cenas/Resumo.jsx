import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";

const LINHAS = [
  { rotulo: "CENTRO", com: "A classe", fas: "A nação", frame: 30 },
  { rotulo: "ECONOMIA", com: "Coletiva", fas: "Privada, sob o Estado", frame: 70 },
  { rotulo: "ALCANCE", com: "Internacional", fas: "Nacionalista", frame: 110 },
  { rotulo: "ESPECTRO", com: "Extrema esquerda", fas: "Extrema direita", frame: 225 },
];

const Celula = ({ largura, cor, children, peso = 800, tamanho = 38 }) => (
  <div
    style={{
      width: largura,
      height: 130,
      borderRadius: 24,
      background: cor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 14px",
      fontWeight: peso,
      fontSize: tamanho,
      lineHeight: 1.1,
      color: FC.branco,
    }}
  >
    {children}
  </div>
);

export const Resumo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cab = spring({ frame: frame - 10, fps, config: { damping: 13 } });

  return (
    <AbsoluteFill>
      <Fundo de={FC.fundo1} para={FC.fundo2} seed="resumo" />
      <CaixaTexto texto="RESUMO" atraso={4} top={170} tamanho={96} fundo="rgba(255,255,255,0.12)" />
      <div style={{ position: "absolute", top: 420, left: 50, right: 50, fontFamily, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", gap: 14, opacity: cab, transform: `translateY(${interpolate(cab, [0, 1], [-40, 0])}px)` }}>
          <div style={{ width: 250 }} />
          <Celula largura={344} cor={FC.com} peso={900} tamanho={36}>COMUNISMO</Celula>
          <Celula largura={344} cor={FC.fas} peso={900} tamanho={36}>FASCISMO</Celula>
        </div>
        {LINHAS.map((l, i) => {
          const s = spring({ frame: frame - l.frame, fps, config: { damping: 14 } });
          return (
            <div
              key={l.rotulo}
              style={{ display: "flex", gap: 14, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [i % 2 ? 300 : -300, 0])}px)` }}
            >
              <Celula largura={250} cor="rgba(255,255,255,0.1)" peso={900} tamanho={30}>{l.rotulo}</Celula>
              <Celula largura={344} cor="rgba(230,57,70,0.35)">{l.com}</Celula>
              <Celula largura={344} cor="rgba(154,140,152,0.35)">{l.fas}</Celula>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
