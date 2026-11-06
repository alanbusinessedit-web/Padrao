import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { B, MONO, TITULO, digitar } from "./estilo";

export const Fundo = () => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, ${B.fundo1} 0%, ${B.fundo2} 75%)` }}>
    {/* linhas de varredura bem leves, para o ar de tela */}
    <AbsoluteFill
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 2px, transparent 2px, transparent 6px)",
      }}
    />
  </AbsoluteFill>
);

// Cursor de digitação piscando.
export const Cursor = ({ cor = B.branco, altura = "0.9em", largura = 6, sempre = false }) => {
  const frame = useCurrentFrame();
  const visivel = sempre || Math.floor(frame / 8) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: largura,
        height: altura,
        background: cor,
        marginLeft: 6,
        verticalAlign: "-0.08em",
        opacity: visivel ? 1 : 0,
      }}
    />
  );
};

// Título em duas linhas: a de cima em branco, a de baixo numa faixa laranja.
// As duas são digitadas no começo da cena (como no estilo de referência).
export const Titulo = ({ linha1, linha2, inicio = 0 }) => {
  const frame = useCurrentFrame();
  const t1 = digitar(linha1, frame, inicio, 42);
  const inicio2 = inicio + Math.ceil((linha1.length / 42) * 30) + 2;
  const t2 = digitar(linha2, frame, inicio2, 30);
  const digitando2 = t2.length < linha2.length && frame >= inicio2;
  // Linhas longas encolhem para não encostar na marca d'água do canto.
  const tam = Math.min(150, Math.floor(1700 / Math.max(linha1.length, linha2.length, 11)));

  return (
    <div style={{ position: "absolute", left: 44, top: 196, fontFamily: TITULO, textTransform: "uppercase" }}>
      <div style={{ fontSize: tam, lineHeight: 1.02, color: B.branco, letterSpacing: 1, minHeight: tam * 1.03 }}>
        {t1}
        {t1.length < linha1.length && <Cursor />}
      </div>
      {t2.length > 0 && (
        <div
          style={{
            display: "inline-block",
            marginTop: 14,
            padding: "2px 26px 6px",
            background: B.laranja,
            color: "#1a120a",
            fontSize: tam,
            lineHeight: 1.05,
            borderRadius: 12,
            boxShadow: `9px 9px 0 ${B.sombraFaixa}`,
          }}
        >
          {t2}
          {digitando2 && <Cursor cor="#1a120a" sempre />}
        </div>
      )}
    </div>
  );
};

// Marca d'água, cantoneira e estrelinhas "+" que piscam (fixas durante o vídeo).
export const Moldura = () => {
  const frame = useCurrentFrame();
  const estrelas = [
    [985, 540, 0],
    [1030, 960, 20],
    [62, 1240, 40],
    [880, 1530, 10],
    [540, 1650, 30],
  ];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 120, right: 50, fontFamily: MONO, fontSize: 30, color: B.apagado }}>
        narrando o direito / <span style={{ color: B.laranja, fontWeight: 700 }}>bastidores</span>
      </div>
      <div style={{ position: "absolute", top: 180, right: 44, width: 70, height: 70, borderTop: `4px solid ${B.linha}`, borderRight: `4px solid ${B.linha}` }} />
      {estrelas.map(([x, y, fase], i) => {
        const brilho = 0.35 + 0.65 * Math.abs(Math.sin(((frame + fase) / 30) * Math.PI * 0.8));
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: MONO, fontWeight: 700, fontSize: 52, color: B.laranja, opacity: brilho }}>
            +
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Painel de interface com borda laranja e etiqueta em cima.
export const Painel = ({ x = 90, y = 560, largura = 900, altura = 820, etiqueta, inicio = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 15, stiffness: 170 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: largura,
        height: altura,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.96, 1])})`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, border: `4px solid ${B.borda}`, borderRadius: 18, background: B.painel }} />
      {etiqueta && (
        <div style={{ position: "absolute", left: 22, top: -24 }}>
          <Etiqueta>{etiqueta}</Etiqueta>
        </div>
      )}
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
  );
};

export const Etiqueta = ({ children, cor = B.laranja, texto = "#1a120a", tamanho = 28 }) => (
  <div
    style={{
      display: "inline-block",
      background: cor,
      color: texto,
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: tamanho,
      padding: "4px 16px",
      borderRadius: 999,
      letterSpacing: 1,
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

// Caixa interna escura com rótulo pequeno.
export const Caixa = ({ x, y, largura, altura, rotulo, ativa = false, children, style }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: largura,
      height: altura,
      background: B.caixa,
      border: `3px solid ${ativa ? B.laranja : B.linha}`,
      borderRadius: 10,
      overflow: "hidden",
      ...style,
    }}
  >
    {rotulo && (
      <div style={{ position: "absolute", left: 16, top: 8, fontFamily: TITULO, fontSize: 34, color: ativa ? B.laranja : B.apagado }}>{rotulo}</div>
    )}
    {children}
  </div>
);

// Onda de áudio em barras. `progresso` (0–1) controla até onde ela já foi "gravada".
export const Onda = ({ largura, altura, barras = 40, cor = B.branco, progresso = 1, seed = "onda", viva = true }) => {
  const frame = useCurrentFrame();
  const passo = largura / barras;
  return (
    <svg width={largura} height={altura}>
      {Array.from({ length: barras }, (_, i) => {
        if (i / barras > progresso) return null;
        const base = 0.25 + 0.75 * random(`${seed}-${i}`);
        const mexe = viva ? 0.6 + 0.4 * Math.abs(Math.sin(frame / 4 + i * 1.7)) : 1;
        const h = Math.max(6, altura * base * mexe);
        return <rect key={i} x={i * passo + passo * 0.2} y={(altura - h) / 2} width={passo * 0.6} height={h} rx={2} fill={cor} />;
      })}
    </svg>
  );
};

// Chiado de TV por cima de uma imagem, que vai sumindo entre `inicio` e `fim`.
export const Ruido = ({ largura, altura, inicio, fim, colunas = 36, seed = "ruido" }) => {
  const frame = useCurrentFrame();
  const opacidade = interpolate(frame, [inicio, fim], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (opacidade <= 0) return null;
  const tam = largura / colunas;
  const linhas = Math.ceil(altura / tam);
  const cores = ["#2b3a66", "#6b4b3a", "#9a8f86", "#c84b3a", "#3f6b4f", "#d8c9a8", "#1b1b22"];
  const quadro = Math.floor(frame / 2);
  return (
    <svg width={largura} height={altura} style={{ position: "absolute", left: 0, top: 0, opacity: opacidade }} shapeRendering="crispEdges">
      {Array.from({ length: linhas * colunas }, (_, i) => (
        <rect
          key={i}
          x={(i % colunas) * tam}
          y={Math.floor(i / colunas) * tam}
          width={tam + 0.5}
          height={tam + 0.5}
          fill={cores[Math.floor(random(`${seed}-${quadro}-${i}`) * cores.length)]}
        />
      ))}
    </svg>
  );
};

// Pequeno "pop" de entrada.
export const usePop = (inicio, damping = 11) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - inicio, fps, config: { damping, stiffness: 180 } });
};
