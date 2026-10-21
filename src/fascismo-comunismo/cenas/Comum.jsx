import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { CaixaTexto } from "../../components/CaixaTexto";
import { Fundo } from "../../components/Fundo";
import { FC } from "../cores";
import { Pessoa } from "../Icones";

const ITENS = [
  { texto: "PARTIDO ÚNICO", frame: 120, x: 70, y: 1090 },
  { texto: "CENSURA", frame: 152, x: 560, y: 1090 },
  { texto: "CULTO AO LÍDER", frame: 176, x: 70, y: 1220 },
  { texto: "PERSEGUIÇÃO", frame: 218, x: 560, y: 1220 },
];

const EXEMPLOS = [
  { texto: "URSS • Stálin", cor: FC.com, frame: 290, x: 70 },
  { texto: "Itália • Mussolini", cor: FC.fas, frame: 345, x: 560 },
];

const Chip = ({ x, y, largura = 450, texto, cor, inicio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 11 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: largura,
        height: 100,
        borderRadius: 30,
        background: cor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        fontWeight: 900,
        fontSize: 42,
        color: FC.branco,
        transform: `scale(${s})`,
        opacity: s,
      }}
    >
      {texto}
    </div>
  );
};

// Líder num palanque, com um cartaz gigante dele atrás e holofotes.
export const Comum = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palco = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const holofote = 0.18 + 0.06 * Math.sin(frame / 7);

  return (
    <AbsoluteFill>
      <Fundo de={FC.fasEscuro} para={FC.fundo1} seed="comum" />
      <CaixaTexto texto="O QUE TÊM EM COMUM?" atraso={4} top={170} tamanho={84} fundo="rgba(242,193,78,0.22)" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(0 ${interpolate(palco, [0, 1], [500, 0])})`} opacity={palco}>
          <path d="M 120 420 L 380 1040 L 220 1040 Z" fill={FC.ouro} opacity={holofote} />
          <path d="M 960 420 L 700 1040 L 860 1040 Z" fill={FC.ouro} opacity={holofote} />
          {/* cartaz gigante */}
          <rect x={340} y={470} width={400} height={420} rx={20} fill={FC.com} />
          <rect x={360} y={490} width={360} height={380} rx={14} fill={FC.fas} />
          <Pessoa x={540} y={760} escala={4.2} cor={FC.fasClaro} corRoupa={FC.fasEscuro} />
          {/* palanque */}
          <rect x={410} y={920} width={260} height={120} rx={14} fill={FC.fasClaro} />
          <Pessoa x={540} y={900} escala={1.5} cor={FC.pele} corRoupa={FC.fasEscuro} quepe />
          <rect x={410} y={900} width={260} height={30} rx={10} fill={FC.ouro} />
        </g>
      </svg>
      {ITENS.map((it) => (
        <Chip key={it.texto} x={it.x} y={it.y} texto={it.texto} cor="rgba(255,255,255,0.14)" inicio={it.frame} />
      ))}
      {EXEMPLOS.map((ex) => (
        <Chip key={ex.texto} x={ex.x} y={1360} texto={ex.texto} cor={ex.cor} inicio={ex.frame} />
      ))}
    </AbsoluteFill>
  );
};
