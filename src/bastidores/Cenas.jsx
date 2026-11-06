import { interpolate, useCurrentFrame } from "remotion";
import { Simbolo } from "../marca/Logo";
import { Avatar } from "./Avatar";
import { Caixa, Cursor, Etiqueta, Onda, Painel, Ruido, usePop } from "./Elementos";
import { B, MONO, TITULO, digitar } from "./estilo";
import { Balanca, MINIATURAS } from "./Miniaturas";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

// 1. Os vídeos do canal, todos publicados, e nenhum rosto.
export const Gancho = () => {
  const carimbo = usePop(58, 9);
  const frame = useCurrentFrame();
  const risco = interpolate(frame, [52, 62], [0, 1], clamp);
  return (
    <Painel etiqueta="meus vídeos" inicio={4}>
      {MINIATURAS.map((Mini, i) => {
        const s = usePop(8 + i * 6);
        const x = 40 + (i % 2) * 425;
        const y = 50 + Math.floor(i / 2) * 380;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: s, transform: `scale(${s})` }}>
            <div style={{ border: `3px solid ${B.borda}`, borderRadius: 8, overflow: "hidden", width: 395, height: 290 }}>
              <Mini largura={395} altura={290} />
            </div>
            <div style={{ position: "absolute", right: 10, top: 300 }}>
              <Etiqueta tamanho={22}>✓ publicado</Etiqueta>
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, top: 405, width: 900 * risco, height: 8, background: B.vermelho }} />
      <div
        style={{
          position: "absolute",
          left: 450,
          top: 405,
          transform: `translate(-50%, -50%) scale(${carimbo}) rotate(-3deg)`,
          background: "#7a1c16",
          border: `5px solid ${B.vermelho}`,
          borderRadius: 10,
          padding: "10px 40px",
          fontFamily: TITULO,
          fontSize: 76,
          color: B.laranja,
          whiteSpace: "nowrap",
        }}
      >
        ROSTO: NENHUM
      </div>
    </Painel>
  );
};

// 2. O narrador em pixel art se materializa no estúdio e acena.
export const Narrador = () => {
  const frame = useCurrentFrame();
  const surgir = interpolate(frame, [16, 52], [0, 1], clamp);
  const nome = usePop(58);
  return (
    <Painel etiqueta="estúdio" inicio={2}>
      <svg width={900} height={820} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="luz" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={B.laranja} stopOpacity="0.35" />
            <stop offset="1" stopColor={B.laranja} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="390,0 510,0 760,780 140,780" fill="url(#luz)" />
        <ellipse cx="450" cy="780" rx="300" ry="26" fill={B.laranja} opacity="0.18" />
        {/* pedestal de microfone vazio */}
        <g fill="#4a4a52">
          <rect x="120" y="470" width="10" height="310" />
          <rect x="80" y="770" width="90" height="10" />
          <rect x="112" y="430" width="26" height="50" rx="12" fill="#6a6a74" />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 450 - 11 * 16, top: 780 - 26 * 16 }}>
        <Avatar tam={16} surgir={surgir} acenando={frame > 54} />
      </div>
      {surgir < 1 && frame > 12 && (
        <div style={{ position: "absolute", left: 270, top: 360, width: 360, height: 420, opacity: 0.5 * (1 - surgir) }}>
          <Ruido largura={360} altura={420} inicio={0} fim={1000} colunas={18} seed="materializa" />
        </div>
      )}
      <div style={{ position: "absolute", left: 450, top: 70, transform: `translateX(-50%) scale(${nome})` }}>
        <Etiqueta tamanho={36}>meu narrador</Etiqueta>
      </div>
    </Painel>
  );
};

const Chave = ({ ligada, rotulo }) => (
  <div style={{ position: "absolute", left: 16, bottom: 18, display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ width: 92, height: 46, borderRadius: 23, background: ligada ? B.laranja : B.linha, position: "relative" }}>
      <div style={{ position: "absolute", top: 5, left: ligada ? 51 : 5, width: 36, height: 36, borderRadius: 18, background: B.branco }} />
    </div>
    <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, color: ligada ? B.branco : B.apagado }}>{rotulo}</span>
  </div>
);

// 3. Nada gravado: a voz vem da IA e o narrador mexe a boca sozinho.
export const Voz = () => {
  const frame = useCurrentFrame();
  const risco = interpolate(frame, [62, 74], [0, 1], clamp);
  const nada = usePop(74, 8);
  return (
    <Painel etiqueta="gravando" inicio={2}>
      <Caixa x={30} y={40} largura={400} altura={520}>
        <div style={{ position: "absolute", left: 200 - 11 * 13, bottom: 0 }}>
          <Avatar tam={13} falando={frame > 10} />
        </div>
      </Caixa>
      <Caixa x={460} y={40} largura={410} altura={160} rotulo="VOZ (IA)" ativa>
        <div style={{ position: "absolute", left: 16, top: 64 }}>
          <Onda largura={378} altura={80} barras={30} progresso={interpolate(frame, [6, 40], [0, 1], clamp)} seed="voz" />
        </div>
      </Caixa>
      <Caixa x={460} y={220} largura={410} altura={160} rotulo="BOCA" ativa={frame > 26}>
        <Chave ligada={frame > 26} rotulo="sincronizada" />
      </Caixa>
      <Caixa x={460} y={400} largura={410} altura={160} rotulo="LEGENDA" ativa={frame > 42}>
        <Chave ligada={frame > 42} rotulo="automática" />
      </Caixa>
      <Caixa x={30} y={590} largura={840} altura={190}>
        <div style={{ position: "absolute", left: 40, top: 0, height: 190, display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: B.vermelho, opacity: Math.floor(frame / 12) % 2 ? 0.5 : 1 }} />
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: B.apagado }}>GRAVADO:</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 64, color: B.branco }}>00:00</span>
        </div>
        <div style={{ position: "absolute", left: 30, top: 92, width: 560 * risco, height: 8, background: B.laranja, transform: "rotate(-4deg)", transformOrigin: "left" }} />
        <div style={{ position: "absolute", right: 40, top: 95, transform: `translateY(-50%) scale(${nada})` }}>
          <div style={{ background: B.vermelho, color: B.branco, fontFamily: TITULO, fontSize: 72, padding: "4px 30px", borderRadius: 14 }}>NADA</div>
        </div>
      </Caixa>
    </Painel>
  );
};

// 4. Digito o tema e a capa aparece saindo do chiado.
export const Tema = () => {
  const frame = useCurrentFrame();
  const tema = "Suspeição ou impedimento: qual a diferença?";
  const texto = digitar(tema, frame, 8, 22);
  const pronto = 8 + Math.ceil((tema.length / 22) * 30) + 4;
  const barra = interpolate(frame, [pronto, pronto + 40], [0, 1], clamp);
  return (
    <Painel etiqueta="novo vídeo" inicio={2}>
      <div style={{ position: "absolute", left: 32, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 28, color: B.apagado }}>TEMA DO VÍDEO</div>
      <div style={{ position: "absolute", left: 30, top: 86, width: 840, height: 190, border: `3px solid ${B.sombraFaixa}`, borderRadius: 12, background: B.caixa, boxSizing: "border-box", padding: "20px 26px" }}>
        <span style={{ fontFamily: TITULO, fontSize: 62, lineHeight: 1.2, color: B.branco }}>
          {texto}
          <Cursor cor={B.laranja} />
        </span>
      </div>
      <Caixa x={30} y={310} largura={840} altura={470} style={{ borderColor: frame >= pronto ? B.borda : B.linha }}>
        {frame < pronto ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 120 }}>
            <div style={{ width: 96, height: 96, borderRadius: 48, border: `4px solid ${B.laranja}`, color: B.laranja, fontFamily: MONO, fontSize: 64, lineHeight: "88px", textAlign: "center" }}>+</div>
            <span style={{ fontFamily: MONO, fontSize: 26, color: B.apagado, position: "absolute", bottom: 26 }}>vídeo vazio</span>
          </div>
        ) : (
          <>
            <Balanca largura={834} altura={464} />
            <Ruido largura={834} altura={464} inicio={pronto} fim={pronto + 26} colunas={40} seed="tema" />
            <div style={{ position: "absolute", left: 0, bottom: 0, height: 10, width: `${barra * 100}%`, background: B.laranja }} />
          </>
        )}
      </Caixa>
    </Painel>
  );
};

const Lupa = ({ x, y }) => (
  <svg width={110} height={110} style={{ position: "absolute", left: x, top: y }}>
    <circle cx="44" cy="44" r="30" fill="rgba(242,169,59,0.12)" stroke={B.laranja} strokeWidth="9" />
    <line x1="66" y1="66" x2="100" y2="100" stroke={B.laranja} strokeWidth="13" strokeLinecap="round" />
  </svg>
);

const FONTES = [
  ["CPC", B.vermelho],
  ["CPP", B.azul],
  ["STJ", B.verde],
];

const ROTEIRO = ["O juiz pode ser afastado?", "Impedimento é fato", "Suspeição é relação", "Prazo de 15 dias"];

// 5. A IA consulta as fontes, escreve o roteiro em cenas e gera a narração.
export const Roteiro = () => {
  const frame = useCurrentFrame();
  const lupaX = interpolate(frame, [10, 62], [40, 720], clamp);
  return (
    <Painel etiqueta="ia trabalhando" inicio={2}>
      {FONTES.map(([nome, cor], i) => {
        const s = usePop(4 + i * 5);
        return (
          <div key={nome} style={{ position: "absolute", left: 30 + i * 280, top: 40, width: 260, height: 150, background: B.creme, borderRadius: 8, overflow: "hidden", opacity: s, transform: `scale(${s})` }}>
            <div style={{ height: 34, background: cor, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: B.branco, paddingLeft: 12, lineHeight: "34px" }}>{nome}</div>
            {[0, 1, 2, 3].map((l) => (
              <div key={l} style={{ margin: "14px 14px 0", height: 10, width: [200, 160, 210, 120][l], background: "#cbbfa6", borderRadius: 4 }} />
            ))}
          </div>
        );
      })}
      {frame < 70 && <Lupa x={lupaX} y={70 + Math.sin(frame / 5) * 14} />}
      <div style={{ position: "absolute", right: 34, top: 198, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: B.laranja, opacity: frame < 70 && Math.floor(frame / 8) % 2 === 0 ? 1 : frame < 70 ? 0.4 : 0 }}>PESQUISANDO…</div>
      <div style={{ position: "absolute", left: 30, top: 236, width: 840, height: 340, background: B.creme, borderRadius: 10 }}>
        <div style={{ position: "absolute", left: 22, top: 14, fontFamily: MONO, fontSize: 24, color: "#8a7a66" }}>roteiro.txt</div>
        {ROTEIRO.map((linha, i) => {
          const inicio = 50 + i * 14;
          if (frame < inicio) return null;
          return (
            <div key={i} style={{ position: "absolute", left: 22, top: 62 + i * 66, display: "flex", gap: 24, alignItems: "baseline" }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 28, color: "#c0392b" }}>CENA {i + 1}</span>
              <span style={{ fontFamily: TITULO, fontSize: 44, color: "#1a120a" }}>{digitar(linha, frame, inicio, 60)}</span>
            </div>
          );
        })}
      </div>
      <Caixa x={30} y={600} largura={840} altura={180} rotulo="NARRAÇÃO" ativa={frame > 100}>
        <svg width={60} height={90} style={{ position: "absolute", left: 24, top: 64 }}>
          <rect x="18" y="6" width="24" height="44" rx="12" fill={frame > 100 ? B.laranja : B.apagado} />
          <path d="M 8 36 Q 8 64 30 64 Q 52 64 52 36" stroke={frame > 100 ? B.laranja : B.apagado} strokeWidth="5" fill="none" />
          <rect x="27" y="64" width="6" height="18" fill={frame > 100 ? B.laranja : B.apagado} />
        </svg>
        <div style={{ position: "absolute", left: 100, top: 62 }}>
          <Onda largura={710} altura={96} barras={56} cor={B.laranja} progresso={interpolate(frame, [100, 145], [0, 1], clamp)} seed="narracao" />
        </div>
      </Caixa>
    </Painel>
  );
};

// 6. O código monta as cenas, uma de cada vez, com legenda e linha do tempo.
export const Cenas = () => {
  const frame = useCurrentFrame();
  const atual = Math.max(0, Math.min(3, Math.floor((frame - 8) / 24)));
  const Atual = MINIATURAS[atual];
  const legenda = ROTEIRO[atual].split(" ");
  const inicioAtual = 8 + atual * 24;
  const palavra = Math.floor(interpolate(frame, [inicioAtual, inicioAtual + 22], [0, legenda.length], clamp));
  const cabeca = interpolate(frame, [8, 130], [0, 1], clamp);
  return (
    <Painel etiqueta="montando cenas" inicio={2}>
      {MINIATURAS.map((Mini, i) => {
        const inicio = 8 + i * 24;
        return (
          <div key={i} style={{ position: "absolute", left: 30 + i * 212, top: 40, width: 200, height: 130, border: `3px solid ${i === atual ? B.laranja : B.linha}`, borderRadius: 6, overflow: "hidden", background: B.caixa }}>
            {frame >= inicio && (
              <>
                <Mini largura={194} altura={124} />
                <Ruido largura={194} altura={124} inicio={inicio} fim={inicio + 12} colunas={14} seed={`tira-${i}`} />
              </>
            )}
          </div>
        );
      })}
      <Caixa x={30} y={200} largura={840} altura={420} style={{ borderColor: B.borda }}>
        <Atual largura={834} altura={414} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "rgba(10,8,6,0.75)", borderRadius: 14, padding: "8px 24px", fontFamily: TITULO, fontSize: 52, display: "flex", gap: 16 }}>
            {legenda.map((p, i) => (
              <span key={i} style={{ color: i === palavra - 1 ? B.laranja : B.branco, opacity: i < palavra ? 1 : 0.35 }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </Caixa>
      <Caixa x={30} y={640} largura={840} altura={140}>
        <div style={{ position: "absolute", left: 18, top: 10, fontFamily: MONO, fontSize: 24, color: B.apagado }}>keyframes</div>
        <div style={{ position: "absolute", left: 30, right: 30, top: 86, height: 4, background: B.linha }} />
        {[0.05, 0.2, 0.3, 0.46, 0.55, 0.7, 0.8, 0.95].map((p, i) => (
          <div key={i} style={{ position: "absolute", left: 30 + p * 780 - 11, top: 75, width: 22, height: 22, background: p <= cabeca ? B.laranja : B.apagado, transform: "rotate(45deg)" }} />
        ))}
        <div style={{ position: "absolute", left: 30 + cabeca * 780 - 2, top: 46, width: 4, height: 80, background: B.vermelho }} />
      </Caixa>
    </Painel>
  );
};

// 7. Encerramento: logo do canal e o botão de seguir sendo clicado.
export const Siga = () => {
  const frame = useCurrentFrame();
  const logo = usePop(4, 10);
  const botao = usePop(14);
  const clique = 58;
  const seguindo = frame >= clique;
  const setaX = interpolate(frame, [26, clique - 4], [880, 640], clamp);
  const setaY = interpolate(frame, [26, clique - 4], [820, 700], clamp);
  const aperto = frame >= clique && frame < clique + 6 ? 0.92 : 1;
  return (
    <Painel etiqueta="narrando o direito" inicio={0}>
      <svg width={900} height={600} viewBox="0 0 900 600" style={{ position: "absolute", top: 0 }}>
        <g transform={`translate(440 300) scale(${0.62 * logo})`}>
          <Simbolo />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 40, top: 820 - 26 * 9 - 4 }}>
        <Avatar tam={9} acenando />
      </div>
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 640,
          width: 520,
          height: 116,
          borderRadius: 58,
          background: seguindo ? B.caixa : B.laranja,
          border: `4px solid ${B.laranja}`,
          color: seguindo ? B.laranja : "#1a120a",
          fontFamily: TITULO,
          fontSize: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${botao * aperto})`,
        }}
      >
        {seguindo ? "SEGUINDO ✓" : "SEGUIR"}
      </div>
      <svg width={70} height={90} style={{ position: "absolute", left: setaX, top: setaY, opacity: frame > 24 ? 1 : 0 }} shapeRendering="crispEdges">
        <path d="M 4 4 L 4 70 L 22 54 L 34 82 L 46 76 L 34 50 L 58 50 Z" fill={B.branco} stroke="#1a120a" strokeWidth="5" />
      </svg>
    </Painel>
  );
};
