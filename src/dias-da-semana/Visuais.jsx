import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";
import { BRANCO, CREME, ESCURO, PaginaCalendario, VERMELHO, quando } from "./Elementos";
import { Icone } from "./Icones";

const useMolas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, mola: (inicio, damping = 12) => spring({ frame: frame - inicio, fps, config: { damping } }) };
};

const Svg = ({ children }) => (
  <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
    {children}
  </svg>
);

// Terça: página "MARTES 13" tremendo, com um gato preto.
export const Calendario = ({ visual, dia }) => {
  const { frame, mola } = useMolas();
  const s = mola(6, 9);
  const treme = frame > 30 ? Math.sin(frame * 1.7) * 3 : 0;
  return (
    <Svg>
      <g transform={`translate(540 690) rotate(${treme}) scale(${1.45 * s})`}>
        <PaginaCalendario topo={visual.topo} numero={visual.numero} cor={dia.cores.corEscura} tamanhoNumero={170} />
      </g>
      <g transform={`translate(${interpolate(mola(40), [0, 1], [1300, 860])} 900)`} fill={ESCURO}>
        <ellipse cx={0} cy={30} rx={80} ry={60} />
        <circle cx={-70} cy={-40} r={50} />
        <path d="M -110 -70 L -105 -125 L -75 -85 Z M -40 -80 L -45 -130 L -70 -90 Z" />
        <path d="M 75 40 Q 140 20 130 -60" stroke={ESCURO} strokeWidth={18} fill="none" strokeLinecap="round" />
        <circle cx={-88} cy={-45} r={9} fill="#ffd60a" />
        <circle cx={-55} cy={-45} r={9} fill="#ffd60a" />
      </g>
    </Svg>
  );
};

// Quarta: os sete astros na ordem caldeia (do mais lento ao mais rápido) e o
// heptagrama que, pulando de 3 em 3, dá a ordem da semana.
const CALDEIA = [
  { nome: "SATURNO", icone: "saturno", dia: "SÁB" },
  { nome: "JÚPITER", icone: "jupiter", dia: "QUI" },
  { nome: "MARTE", icone: "marte", dia: "TER" },
  { nome: "SOL", icone: "sol", dia: "DOM" },
  { nome: "VÊNUS", icone: "venus", dia: "SEX" },
  { nome: "MERCÚRIO", icone: "mercurio", dia: "QUA" },
  { nome: "LUA", icone: "lua", dia: "SEG" },
];
const SALTOS = [0, 3, 6, 2, 5, 1, 4]; // Saturno, Sol, Lua, Marte, Mercúrio, Júpiter, Vênus

export const Heptagrama = ({ dia, cena }) => {
  const { frame, mola } = useMolas();
  const cx = 540;
  const cy = 820;
  const R = 290;
  const pos = (i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  };
  const tHoras = 10;
  const tPulo = quando(cena, "Pulando", Math.round(cena.duracao * 0.45));
  const tAstros = SALTOS.map((_, k) => quando(cena, ["Saturno", "Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus"][k], tPulo + 20 + k * 15));
  const tFinal = quando(cena, "Exatamente", cena.duracao - 60);

  // ponteiro das horas passando pelos astros em ordem
  const ponteiro = interpolate(frame, [tHoras + 30, tPulo - 10], [0, 7 * 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ativoHora = frame < tPulo - 10 && frame > tHoras + 30 ? Math.floor(ponteiro) % 7 : -1;

  const linhas = SALTOS.slice(1).map((alvo, k) => {
    const de = pos(SALTOS[k]);
    const para = pos(alvo);
    const p = interpolate(frame, [tAstros[k + 1] - 10, tAstros[k + 1]], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { de, para, p };
  });
  const ultimo = interpolate(frame, [tAstros[6] + 10, tAstros[6] + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  linhas.push({ de: pos(SALTOS[6]), para: pos(SALTOS[0]), p: ultimo });

  const angPonteiro = (ponteiro * 360) / 7;

  return (
    <>
      <Svg>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={6} strokeDasharray="14 14" />
        {ativoHora >= 0 && (
          <g transform={`translate(${cx} ${cy}) rotate(${angPonteiro})`}>
            <rect x={-7} y={-R + 90} width={14} height={R - 90} rx={7} fill={BRANCO} opacity={0.8} />
            <circle r={18} fill={BRANCO} />
          </g>
        )}
        {linhas.map(({ de, para, p }, k) => (
          <line
            key={k}
            x1={de[0]}
            y1={de[1]}
            x2={de[0] + (para[0] - de[0]) * p}
            y2={de[1] + (para[1] - de[1]) * p}
            stroke={dia.cores.cor}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={p > 0 ? 1 : 0}
          />
        ))}
        {CALDEIA.map((astro, i) => {
          const [x, y] = pos(i);
          const s = mola(6 + i * 5);
          const k = SALTOS.indexOf(i);
          const aceso = frame >= tAstros[k];
          const brilho = ativoHora === i || (aceso && frame < tAstros[k] + 15);
          return (
            <g key={astro.nome} transform={`translate(${x} ${y}) scale(${s * (brilho ? 1.15 : 1)})`}>
              <circle r={82} fill={aceso ? dia.cores.corEscura : "rgba(0,0,0,0.4)"} stroke={brilho ? BRANCO : dia.cores.cor} strokeWidth={brilho ? 10 : 5} />
              <g transform="scale(0.36)">
                <Icone nome={astro.icone} />
              </g>
              <text y={y < cy ? -100 : 125} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={30} fill={BRANCO}>
                {astro.nome}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={54} fill={BRANCO} opacity={interpolate(frame, [tHoras + 30, tHoras + 45, tPulo - 20, tPulo - 5], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          24 HORAS
        </text>
      </Svg>
      {/* a sequência da semana se formando */}
      <div style={{ position: "absolute", top: 1265, left: 40, right: 40, display: "flex", justifyContent: "center", gap: 10, fontFamily }}>
        {SALTOS.map((i, k) => {
          const s = spring({ frame: frame - tAstros[k], fps: 30, config: { damping: 11 } });
          const destaque = frame > tFinal ? 1 + 0.06 * Math.sin((frame - tFinal) / 4 + k) : 1;
          return (
            <div
              key={k}
              style={{
                width: 132,
                height: 120,
                borderRadius: 22,
                background: frame > tFinal ? dia.cores.corEscura : "rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: BRANCO,
                transform: `scale(${s * destaque})`,
                opacity: s,
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 40 }}>{CALDEIA[i].dia}</div>
              <div style={{ fontWeight: 700, fontSize: 18, opacity: 0.85 }}>{CALDEIA[i].nome}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Quinta: QUI 29 -> (SEX 30 some) -> SÁB 31, em Samoa, dezembro de 2011.
export const Samoa = ({ dia, cena }) => {
  const { frame, mola } = useMolas();
  const tPaginas = quando(cena, "Depois", Math.round(cena.duracao * 0.4)) - 10;
  const tSome = quando(cena, "sexta-feira", Math.round(cena.duracao * 0.75));
  const some = interpolate(frame, [tSome, tSome + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = mola(10);
  const paginas = [
    { topo: "QUI", numero: "29", x: 230, inicio: tPaginas },
    { topo: "SEX", numero: "30", x: 540, inicio: tPaginas + 12 },
    { topo: "SÁB", numero: "31", x: 850, inicio: tPaginas + 24 },
  ];
  const junta = interpolate(frame, [tSome + 25, tSome + 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Svg>
      {/* globo com a linha de data */}
      <g transform={`translate(540 560) scale(${x})`}>
        <circle r={170} fill="#1971c2" />
        <path d="M -110 -60 Q -60 -110 -10 -70 Q 20 -30 -40 0 Q -90 20 -110 -60 Z" fill="#40c057" />
        <path d="M 30 40 Q 90 10 120 60 Q 100 120 50 110 Q 10 90 30 40 Z" fill="#40c057" />
        <path d="M 0 -170 L -20 -60 L 20 30 L -10 170" stroke={dia.cores.cor} strokeWidth={10} strokeDasharray="22 14" fill="none" />
        <circle cx={-45} cy={20} r={14} fill={VERMELHO} stroke={BRANCO} strokeWidth={5} />
        <text x={-45} y={-5} textAnchor="end" fontFamily={fontFamily} fontWeight={900} fontSize={34} fill={BRANCO} dx={-24}>
          SAMOA
        </text>
      </g>
      <text x={540} y={800} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={44} fill={dia.cores.cor} letterSpacing={6} opacity={mola(tPaginas - 10)}>
        DEZEMBRO DE 2011
      </text>
      {paginas.map((p, i) => {
        const s = mola(p.inicio, 11);
        const meio = i === 1;
        const dx = i === 0 ? junta * 150 : i === 2 ? -junta * 150 : 0;
        return (
          <g
            key={p.numero}
            transform={`translate(${p.x + dx + (meio ? some * 60 : 0)} ${1030 + (meio ? some * 900 : 0)}) rotate(${meio ? some * 40 : 0}) scale(${0.85 * s})`}
            opacity={meio ? 1 - some : 1}
          >
            <PaginaCalendario topo={p.topo} numero={p.numero} cor={meio ? "#868e96" : dia.cores.corEscura} />
            {meio && frame > tSome - 15 && (
              <g stroke={VERMELHO} strokeWidth={26} strokeLinecap="round" opacity={interpolate(frame, [tSome - 15, tSome - 5], [0, 1], { extrapolateRight: "clamp" })}>
                <line x1={-110} y1={-110} x2={110} y2={130} />
                <line x1={110} y1={-110} x2={-110} y2={130} />
              </g>
            )}
          </g>
        );
      })}
    </Svg>
  );
};

// Sexta: a palavra gigante e as três partes gregas.
export const Palavra = ({ visual, dia, cena }) => {
  const { frame, mola } = useMolas();
  const cores = [dia.cores.cor, "#ffd166", "#4cc9f0"];
  const tPalavra = Math.max(15, quando(cena, "parascavedecatriafobia", 30) - 6);
  // a narração tem acentos ("paraskeví"): compara sem acento
  const palavras = cena.narracao.split(" ").map((p) => p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""));
  const tParte = (i) => {
    const alvo = visual.partes[i].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").slice(0, 6);
    const k = palavras.findIndex((p, j) => j > 6 && p.startsWith(alvo));
    return k < 0 ? tPalavra + 60 + i * 40 : Math.round(6 + (k / palavras.length) * (cena.duracao - 21));
  };
  const cal = mola(4, 9);
  const palavra = mola(tPalavra, 11);
  // partes da palavra em português para colorir: PARASCAVE | DECATRIA | FOBIA
  const pedacos = ["PARASCAVE", "DECATRIA", "FOBIA"];
  const treme = Math.sin(frame * 1.5) * 2;

  return (
    <>
      <Svg>
        <g transform={`translate(540 560) rotate(${treme}) scale(${cal})`}>
          <PaginaCalendario topo="SEXTA" numero="13" cor={dia.cores.corEscura} largura={280} altura={300} tamanhoNumero={140} />
        </g>
      </Svg>
      <div style={{ position: "absolute", top: 790, width: "100%", display: "flex", justifyContent: "center", fontFamily }}>
        <div
          style={{
            background: CREME,
            borderRadius: 26,
            padding: "22px 30px",
            fontWeight: 900,
            fontSize: 56,
            letterSpacing: 1,
            transform: `scale(${palavra})`,
            boxShadow: "0 12px 0 rgba(0,0,0,0.25)",
          }}
        >
          {pedacos.map((p, i) => (
            <span key={p} style={{ color: frame >= tParte(i) ? ["#c9306e", "#b8860b", "#1971c2"][i] : ESCURO }}>
              {p}
            </span>
          ))}
        </div>
      </div>
      {visual.partes.map((parte, i) => {
        const s = mola(tParte(i), 13);
        return (
          <div
            key={parte}
            style={{
              position: "absolute",
              top: 960 + i * 150,
              left: 60,
              width: 960,
              height: 128,
              borderRadius: 28,
              background: "rgba(0,0,0,0.28)",
              borderLeft: `18px solid ${cores[i]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 40px",
              boxSizing: "border-box",
              fontFamily,
              color: BRANCO,
              transform: `translateX(${interpolate(s, [0, 1], [i % 2 ? -1100 : 1100, 0])}px)`,
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 52, color: cores[i] }}>{parte}</span>
            <span style={{ fontWeight: 900, fontSize: 46 }}>= {visual.significados[i]}</span>
          </div>
        );
      })}
    </>
  );
};

// Sábado: a semana em inglês; só Saturday é de um deus romano.
const INGLES = [
  { dia: "SUNDAY", origem: "SOL", tipo: "astro" },
  { dia: "MONDAY", origem: "LUA", tipo: "astro" },
  { dia: "TUESDAY", origem: "TYR", tipo: "nórdico" },
  { dia: "WEDNESDAY", origem: "ODIN", tipo: "nórdico" },
  { dia: "THURSDAY", origem: "THOR", tipo: "nórdico" },
  { dia: "FRIDAY", origem: "FRIGG", tipo: "nórdico" },
  { dia: "SATURDAY", origem: "SATURNO", tipo: "ROMANO!" },
];

export const SemanaInglesa = ({ dia, cena }) => {
  const { frame, mola } = useMolas();
  const tOutros = quando(cena, "outros", Math.round(cena.duracao * 0.6)) - 8;
  return (
    <div style={{ position: "absolute", top: 380, left: 60, width: 960, fontFamily }}>
      {INGLES.map((d, i) => {
        const sabado = i === 6;
        const s = mola(sabado ? 8 : tOutros + i * 6, 13);
        const pulso = sabado ? 1 + 0.03 * Math.sin(frame / 5) : 1;
        return (
          <div
            key={d.dia}
            style={{
              position: "absolute",
              top: i * 128 + (sabado ? 10 : 0),
              left: 0,
              right: 0,
              height: sabado ? 130 : 110,
              borderRadius: 24,
              background: sabado ? dia.cores.cor : "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 36px",
              boxSizing: "border-box",
              color: sabado ? ESCURO : BRANCO,
              transform: `translateX(${interpolate(s, [0, 1], [sabado ? 0 : 1100, 0])}px) scale(${(sabado ? s : 1) * pulso})`,
              opacity: sabado ? s : 1,
            }}
          >
            <span style={{ fontWeight: 900, fontSize: sabado ? 60 : 48 }}>{d.dia}</span>
            <span style={{ fontWeight: 800, fontSize: sabado ? 44 : 36 }}>
              {d.origem} <span style={{ opacity: 0.7, fontSize: sabado ? 34 : 28 }}>· {d.tipo}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Domingo: a numeração começa no domingo; na norma ISO, começa na segunda.
const TRADICAO = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const ISO = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

const Fileira = ({ top, rotulo, dias, cor, inicios, destaque, frame, marcarDomingo = false }) => (
  <div style={{ position: "absolute", top, left: 40, right: 40, fontFamily, color: BRANCO }}>
    <div style={{ textAlign: "center", fontWeight: 900, fontSize: 38, letterSpacing: 4, marginBottom: 18, opacity: inicios[0] <= frame ? 1 : 0 }}>{rotulo}</div>
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
      {dias.map((d, i) => {
        const s = spring({ frame: frame - inicios[i], fps: 30, config: { damping: 12 } });
        const ativo = destaque === i;
        return (
          <div key={d} style={{ width: 130, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transform: `scale(${s * (ativo ? 1 + 0.08 * Math.sin(frame / 4) : 1)})`, opacity: s }}>
            <div style={{ width: 130, height: 110, borderRadius: 22, background: ativo || (marcarDomingo && d === "DOM") ? cor : "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 38, color: ativo || (marcarDomingo && d === "DOM") ? ESCURO : BRANCO }}>
              {d}
            </div>
            <div style={{ fontWeight: 900, fontSize: 56 }}>{i + 1}º</div>
          </div>
        );
      })}
    </div>
  </div>
);

export const SemanaNumeros = ({ dia, cena }) => {
  const frame = useCurrentFrame();
  const tSeg = quando(cena, "segunda", 60);
  const tTer = quando(cena, "terça", 80);
  const tAssim = quando(cena, "assim", 110);
  const tIso = quando(cena, "ISO", Math.round(cena.duracao * 0.6));
  const tRegra = quando(cena, "Pela", cena.duracao - 90);
  const inicios1 = [8, tSeg, tTer, tAssim, tAssim + 5, tAssim + 10, tAssim + 15];
  const inicios2 = ISO.map((_, i) => tIso + i * 5);
  return (
    <>
      <Fileira top={420} rotulo="NO CALENDÁRIO" marcarDomingo dias={TRADICAO} cor={dia.cores.cor} inicios={inicios1} frame={frame} />
      <Fileira top={850} rotulo="NA NORMA ISO 8601" dias={ISO} cor="#4cc9f0" inicios={inicios2} destaque={frame >= tRegra ? 0 : undefined} frame={frame} />
    </>
  );
};

export const VISUAIS = {
  calendario: Calendario,
  heptagrama: Heptagrama,
  samoa: Samoa,
  palavra: Palavra,
  semanaInglesa: SemanaInglesa,
  semanaNumeros: SemanaNumeros,
};
