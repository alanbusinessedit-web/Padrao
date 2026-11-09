import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";

export const BRANCO = "#ffffff";
export const CREME = "#fdf0d5";
export const ESCURO = "#1d1d2b";
export const VERMELHO = "#e63946";

// A ordem da série (segunda a domingo) e a ordem tradicional do calendário.
export const SEMANA = [
  { id: "segunda", curto: "SEG", nome: "SEGUNDA", sufixo: "-FEIRA" },
  { id: "terca", curto: "TER", nome: "TERÇA", sufixo: "-FEIRA" },
  { id: "quarta", curto: "QUA", nome: "QUARTA", sufixo: "-FEIRA" },
  { id: "quinta", curto: "QUI", nome: "QUINTA", sufixo: "-FEIRA" },
  { id: "sexta", curto: "SEX", nome: "SEXTA", sufixo: "-FEIRA" },
  { id: "sabado", curto: "SÁB", nome: "SÁBADO", sufixo: "" },
  { id: "domingo", curto: "DOM", nome: "DOMINGO", sufixo: "" },
];

// Frame (relativo à cena) em que a narração chega à primeira palavra que começa
// com `trecho`. Usa a mesma conta da Legenda: as palavras são distribuídas por
// igual entre o frame 6 e o fim da fala (duração da cena - 15).
export const quando = (cena, trecho, reserva = 0) => {
  if (!trecho || !cena.narracao) return reserva;
  const palavras = cena.narracao.split(" ");
  const alvo = trecho.toLowerCase();
  const i = palavras.findIndex((p) => p.toLowerCase().startsWith(alvo));
  if (i < 0) return reserva;
  return Math.round(6 + (i / palavras.length) * (cena.duracao - 21));
};

export const useMola = (inicio, config = { damping: 13 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - inicio, fps, config });
};

// Selo da série no topo: "DIAS DA SEMANA · 1/7".
export const SeloSerie = ({ dia }) => (
  <div style={{ position: "absolute", top: 70, width: "100%", display: "flex", justifyContent: "center" }}>
    <div
      style={{
        fontFamily,
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: 4,
        color: BRANCO,
        background: "rgba(0,0,0,0.22)",
        padding: "12px 30px",
        borderRadius: 999,
      }}
    >
      DIAS DA SEMANA <span style={{ color: dia.cores.cor }}>· {dia.ordem}/7</span>
    </div>
  </div>
);

// Cartão de texto com barra lateral na cor do dia; entra deslizando.
export const Cartao = ({ top, cor, inicio, titulo, texto, de = "direita" }) => {
  const s = useMola(inicio, { damping: 14 });
  const desloc = interpolate(s, [0, 1], [de === "direita" ? 1100 : -1100, 0]);
  const tamTitulo = titulo.length > 24 ? 38 : titulo.length > 18 ? 44 : 50;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 60,
        width: 960,
        minHeight: 128,
        borderRadius: 30,
        background: "rgba(0,0,0,0.25)",
        borderLeft: `18px solid ${cor}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "18px 34px",
        boxSizing: "border-box",
        fontFamily,
        color: BRANCO,
        transform: `translateX(${desloc}px)`,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: tamTitulo, lineHeight: 1.08 }}>{titulo}</div>
      {texto && <div style={{ fontWeight: 600, fontSize: 32, marginTop: 6, opacity: 0.9 }}>{texto}</div>}
    </div>
  );
};

// Lista de cartões a partir de `cena.cards` (cada um pode ter `em`: palavra da
// narração em que ele entra).
export const Cartoes = ({ cena, cor, top = 1040, passo = 152 }) => (
  <>
    {(cena.cards ?? []).map((c, i) => (
      <Cartao
        key={c.titulo}
        top={top + i * passo}
        cor={cor}
        inicio={quando(cena, c.em, Math.round(cena.duracao * (0.15 + i * 0.2)))}
        titulo={c.titulo}
        texto={c.texto}
        de={i % 2 ? "esquerda" : "direita"}
      />
    ))}
  </>
);

// Página de calendário (centrada em 0,0; 300x330), usada em várias cenas.
export const PaginaCalendario = ({ topo, numero, cor, largura = 300, altura = 330, tamanhoNumero = 150, tamanhoTopo = 44 }) => (
  <g>
    <rect x={-largura / 2} y={-altura / 2 + 10} width={largura} height={altura} rx={30} fill="rgba(0,0,0,0.25)" />
    <rect x={-largura / 2} y={-altura / 2} width={largura} height={altura} rx={30} fill={CREME} />
    <path
      d={`M ${-largura / 2} ${-altura / 2 + 30} Q ${-largura / 2} ${-altura / 2} ${-largura / 2 + 30} ${-altura / 2} L ${largura / 2 - 30} ${-altura / 2} Q ${largura / 2} ${-altura / 2} ${largura / 2} ${-altura / 2 + 30} L ${largura / 2} ${-altura / 2 + 90} L ${-largura / 2} ${-altura / 2 + 90} Z`}
      fill={cor}
    />
    {[-0.25, 0.25].map((f) => (
      <rect key={f} x={f * largura - 10} y={-altura / 2 - 26} width={20} height={56} rx={10} fill={ESCURO} />
    ))}
    <text y={-altura / 2 + 62} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={tamanhoTopo} fill={BRANCO} letterSpacing={2}>
      {topo}
    </text>
    {numero && (
      <text y={altura / 2 - 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={tamanhoNumero} fill={ESCURO}>
        {numero}
      </text>
    )}
  </g>
);
