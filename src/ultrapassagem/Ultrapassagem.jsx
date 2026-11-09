import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonte";
import { MARCA } from "../marca/Logo";
import { Marca } from "../suspeicao-impedimento/cenas/Marca";

// "Ultrapassagem pela esquerda" — desenho animado visto de cima, 1080x1920, 30fps.
// Pista simples de mão dupla (linha amarela seccionada: ultrapassagem permitida).
// O carro azul dá seta para a esquerda, ultrapassa o vermelho pela esquerda,
// dá seta para a direita e volta à faixa de origem (CTB, art. 29, IX a XI).

export const DURACAO_PISTA = 870; // animação na pista
export const DURACAO_RESUMO = 210;
export const DURACAO_MARCA = 90;
export const DURACAO_ULTRAPASSAGEM = DURACAO_PISTA + DURACAO_RESUMO + DURACAO_MARCA; // 1170 = 39s

const C = {
  grama: "#5bb15d",
  gramaEscura: "#4a9a4d",
  asfalto: "#3d4048",
  acostamento: "#565a63",
  faixa: "#ffffff",
  amarela: "#ffd166",
  azul: "#3a86ff",
  azulEscuro: "#2457b3",
  vermelho: "#ef476f",
  vermelhoEscuro: "#b02a4c",
  cinza: "#adb5bd",
  cinzaEscuro: "#6c757d",
  vidro: "#1d2a44",
  seta: "#ffb703",
  verde: "#06d6a0",
};

// ---------- geometria da pista ----------
const CENTRO = 540;
const FAIXA_ESQ = 400; // centro da faixa da esquerda (sentido contrário)
const FAIXA_DIR = 680; // centro da faixa da direita (nossa mão)
const BORDA_ESQ = 260;
const BORDA_DIR = 820;
const ANCORA = 1100; // altura da tela onde fica o ponto acompanhado pela câmera
const COMPRIMENTO = 230;
const LARGURA_CARRO = 124;
const V_LENTO = 9; // px/frame do carro vermelho

// ---------- roteiro de movimento (frames) ----------
const T = {
  titulo: [0, 95],
  olhar: [95, 250], // verifica a faixa da esquerda (carro vindo)
  setaEsq: [250, 455], // seta esquerda ligada
  muda: [330, 420], // muda para a esquerda
  passa: [420, 580],
  setaDir: [580, 770],
  volta: [650, 760],
  fim: [760, DURACAO_PISTA],
};

const lin = (f, ins, outs) => interpolate(f, ins, outs, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Distância (frente) do carro azul em relação ao vermelho, suavizada.
const dyBruto = (f) =>
  lin(f, [0, 95, 250, 330, 420, 580, 650, 760, DURACAO_PISTA], [-900, -720, -460, -440, -300, 460, 520, 640, 820]);
const dy = (f) => {
  let s = 0;
  for (let k = -20; k <= 20; k++) s += dyBruto(f + k);
  return s / 41;
};

const suave = Easing.inOut(Easing.cubic);
const xAzul = (f) => {
  if (f < T.muda[0]) return FAIXA_DIR;
  if (f < T.volta[0])
    return interpolate(f, T.muda, [FAIXA_DIR, FAIXA_ESQ], { easing: suave, extrapolateRight: "clamp" });
  return interpolate(f, T.volta, [FAIXA_ESQ, FAIXA_DIR], { easing: suave, extrapolateRight: "clamp" });
};

const yVermelho = (f) => V_LENTO * f;
const yAzul = (f) => yVermelho(f) + dy(f);
const camera = (f) => yVermelho(f) + dy(f) / 2;

// Carros no sentido contrário (faixa da esquerda), descendo a tela.
const V_CONTRARIO = 16;
const contrarios = [
  { cor: C.cinza, escura: C.cinzaEscuro, cruzaEm: 185 }, // cruza o azul antes da manobra
  { cor: "#8338ec", escura: "#5a189a", cruzaEm: 830 }, // vem depois que o azul já voltou
];
const yContrario = (c, f) => yAzul(c.cruzaEm) - V_CONTRARIO * (f - c.cruzaEm);

// ---------- desenho ----------
const Carro = ({ cor, escura, setaEsq = false, setaDir = false, piscando = false }) => {
  const L = LARGURA_CARRO;
  const H = COMPRIMENTO;
  const luz = (ligada) => (ligada && piscando ? C.seta : "#7a5a10");
  return (
    <g>
      {/* sombra */}
      <rect x={-L / 2 + 8} y={-H / 2 + 10} width={L} height={H} rx={34} fill="rgba(0,0,0,0.25)" />
      {/* rodas */}
      {[-1, 1].map((lado) =>
        [-H * 0.3, H * 0.3].map((yy) => (
          <rect key={`${lado}${yy}`} x={lado * (L / 2) - 10} y={yy - 22} width={20} height={44} rx={6} fill="#1b1b1b" />
        ))
      )}
      {/* carroceria */}
      <rect x={-L / 2} y={-H / 2} width={L} height={H} rx={34} fill={cor} />
      <rect x={-L / 2 + 10} y={-H / 2 + 8} width={L - 20} height={H - 16} rx={28} fill="none" stroke={escura} strokeWidth={4} />
      {/* para-brisa, teto e vidro traseiro (frente para cima) */}
      <path d={`M ${-L / 2 + 16} ${-H * 0.16} Q 0 ${-H * 0.28} ${L / 2 - 16} ${-H * 0.16} L ${L / 2 - 22} ${-H * 0.04} L ${-L / 2 + 22} ${-H * 0.04} Z`} fill={C.vidro} />
      <rect x={-L / 2 + 22} y={-H * 0.04} width={L - 44} height={H * 0.26} rx={10} fill={escura} />
      <path d={`M ${-L / 2 + 22} ${H * 0.22} L ${L / 2 - 22} ${H * 0.22} L ${L / 2 - 16} ${H * 0.33} Q 0 ${H * 0.38} ${-L / 2 + 16} ${H * 0.33} Z`} fill={C.vidro} />
      {/* retrovisores */}
      <rect x={-L / 2 - 14} y={-H * 0.16} width={16} height={12} rx={4} fill={escura} />
      <rect x={L / 2 - 2} y={-H * 0.16} width={16} height={12} rx={4} fill={escura} />
      {/* faróis e lanternas */}
      <rect x={-L / 2 + 12} y={-H / 2 + 2} width={30} height={10} rx={5} fill="#fff8d6" />
      <rect x={L / 2 - 42} y={-H / 2 + 2} width={30} height={10} rx={5} fill="#fff8d6" />
      <rect x={-L / 2 + 14} y={H / 2 - 12} width={28} height={9} rx={4} fill="#d00000" />
      <rect x={L / 2 - 42} y={H / 2 - 12} width={28} height={9} rx={4} fill="#d00000" />
      {/* setas (dianteiras e traseiras) */}
      {[
        [-1, setaEsq],
        [1, setaDir],
      ].map(([lado, ligada]) => (
        <g key={lado}>
          {[-H / 2 + 6, H / 2 - 8].map((yy) => (
            <g key={yy}>
              {ligada && piscando && <circle cx={lado * (L / 2 - 6)} cy={yy} r={30} fill={C.seta} opacity={0.45} />}
              <rect x={lado * (L / 2 - 6) - 9} y={yy - 7} width={18} height={14} rx={5} fill={luz(ligada)} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
};

const Arvore = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cx={8} cy={10} r={r} fill="rgba(0,0,0,0.18)" />
    <circle r={r} fill="#2d6a4f" />
    <circle cx={-r * 0.25} cy={-r * 0.25} r={r * 0.55} fill="#40916c" />
  </g>
);

// pseudo-aleatório determinístico
const rnd = (i) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const Pista = ({ cam }) => {
  // y da tela para um y do mundo
  const tela = (yMundo) => ANCORA - (yMundo - cam);
  const PER = 140;
  const tracos = [];
  const base = Math.floor((cam - 1200) / PER) * PER;
  for (let w = base; w < cam + 1300; w += PER) tracos.push(w);
  const PER_ARV = 230;
  const arvores = [];
  const baseA = Math.floor((cam - 1400) / PER_ARV);
  for (let i = baseA; i < baseA + 16; i++) {
    const w = i * PER_ARV;
    arvores.push({ k: `e${i}`, x: 70 + rnd(i) * 110, y: tela(w + rnd(i + 7) * 90), r: 40 + rnd(i + 3) * 26 });
    arvores.push({ k: `d${i}`, x: 900 + rnd(i + 11) * 120, y: tela(w + 110 + rnd(i + 5) * 90), r: 40 + rnd(i + 9) * 26 });
  }
  return (
    <g>
      <rect width={1080} height={1920} fill={C.grama} />
      {tracos.map((w) => (
        <rect key={`g${w}`} x={0} y={tela(w)} width={1080} height={PER / 2} fill={C.gramaEscura} opacity={0.35} />
      ))}
      <rect x={BORDA_ESQ - 40} y={0} width={BORDA_DIR - BORDA_ESQ + 80} height={1920} fill={C.acostamento} />
      <rect x={BORDA_ESQ} y={0} width={BORDA_DIR - BORDA_ESQ} height={1920} fill={C.asfalto} />
      <rect x={BORDA_ESQ + 6} y={0} width={10} height={1920} fill={C.faixa} />
      <rect x={BORDA_DIR - 16} y={0} width={10} height={1920} fill={C.faixa} />
      {/* linha amarela seccionada: ultrapassagem permitida */}
      {tracos.map((w) => (
        <rect key={w} x={CENTRO - 7} y={tela(w) - 70} width={14} height={70} rx={4} fill={C.amarela} />
      ))}
      {arvores.map((a) => (
        <Arvore key={a.k} x={a.x} y={a.y} r={a.r} />
      ))}
    </g>
  );
};

// Painel de instrução no topo
const PASSOS = [
  { de: T.olhar[0], ate: T.setaEsq[0], n: 1, texto: "Olhe: a faixa da esquerda está livre?", lei: "CTB, art. 29, X" },
  { de: T.setaEsq[0], ate: T.muda[1], n: 2, texto: "Dê seta para a ESQUERDA com antecedência", lei: "CTB, art. 29, XI, a" },
  { de: T.muda[1], ate: T.setaDir[0], n: 3, texto: "Ultrapasse pela ESQUERDA, com distância lateral segura", lei: "CTB, art. 29, IX e XI, b" },
  { de: T.setaDir[0], ate: T.volta[0] + 30, n: 4, texto: "Dê seta para a DIREITA", lei: "CTB, art. 29, XI, c" },
  { de: T.volta[0] + 30, ate: DURACAO_PISTA, n: 5, texto: "Volte à faixa da direita sem fechar quem foi ultrapassado", lei: "CTB, art. 29, XI, c" },
];

const Instrucao = ({ f, fps }) => {
  const passo = PASSOS.find((p) => f >= p.de && f < p.ate);
  if (!passo) return null;
  const e = spring({ frame: f - passo.de, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 50,
        right: 50,
        padding: "30px 36px",
        borderRadius: 34,
        background: "rgba(27,31,59,0.92)",
        display: "flex",
        gap: 28,
        alignItems: "center",
        transform: `translateY(${interpolate(e, [0, 1], [-60, 0])}px)`,
        opacity: e,
        boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          minWidth: 104,
          height: 104,
          borderRadius: 52,
          background: MARCA.ouro,
          color: MARCA.azul1,
          fontSize: 64,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {passo.n}
      </div>
      <div>
        <div style={{ color: "white", fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>{passo.texto}</div>
        <div style={{ color: MARCA.ciano, fontSize: 34, fontWeight: 600, marginTop: 10 }}>{passo.lei}</div>
      </div>
    </div>
  );
};

// Painel do carro: setas do painel piscando
const PainelSetas = ({ esq, dir, piscando }) => {
  const seta = (ligada, lado) => (
    <svg width={150} height={110} viewBox="-75 -55 150 110">
      <path
        d="M -65 0 L -10 -48 L -10 -22 L 60 -22 L 60 22 L -10 22 L -10 48 Z"
        transform={lado > 0 ? "scale(-1 1)" : undefined}
        fill={ligada && piscando ? C.verde : "#2f3a4f"}
        stroke={ligada ? C.verde : "#46516a"}
        strokeWidth={4}
      />
    </svg>
  );
  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "18px 40px",
        borderRadius: 60,
        background: "rgba(27,31,59,0.9)",
        display: "flex",
        alignItems: "center",
        gap: 40,
      }}
    >
      {seta(esq, -1)}
      <div style={{ color: "white", fontSize: 40, fontWeight: 900, letterSpacing: 4 }}>SETA</div>
      {seta(dir, 1)}
    </div>
  );
};

const CenaPista = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = camera(frame);
  const tela = (yMundo) => ANCORA - (yMundo - cam);

  const xA = xAzul(frame);
  const ang = (Math.atan2(xAzul(frame + 1) - xAzul(frame - 1), yAzul(frame + 1) - yAzul(frame - 1)) * 180) / Math.PI;
  const piscando = Math.floor(frame / 10) % 2 === 0;
  const setaEsq = frame >= T.setaEsq[0] && frame < T.setaEsq[1];
  const setaDir = frame >= T.setaDir[0] && frame < T.setaDir[1];

  const yA = tela(yAzul(frame));
  const yV = tela(yVermelho(frame));

  // "faixa livre?" durante o passo 1
  const livre = frame >= 215 && frame < T.setaEsq[0];
  const olhando = frame >= T.olhar[0] && frame < T.setaEsq[0];

  // distância lateral quando estão lado a lado
  const ladoALado = lin(Math.abs(dy(frame)), [140, 260], [1, 0]) * (frame > T.muda[1] && frame < T.volta[0] ? 1 : 0);

  const titulo = lin(frame, [0, 12, 80, 95], [0, 1, 1, 0]);
  const ok = spring({ frame: frame - (T.volta[1] + 10), fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{ position: "absolute" }}>
        <Pista cam={cam} />

        {/* faixa da esquerda destacada enquanto verifica */}
        {olhando && (
          <rect
            x={BORDA_ESQ + 16}
            y={0}
            width={CENTRO - BORDA_ESQ - 24}
            height={1920}
            fill={livre ? C.verde : "#ffffff"}
            opacity={0.12 + 0.06 * Math.sin(frame / 5)}
          />
        )}

        {contrarios.map((c, i) => {
          const y = tela(yContrario(c, frame));
          if (y < -300 || y > 2200) return null;
          return (
            <g key={i} transform={`translate(${FAIXA_ESQ} ${y}) rotate(180)`}>
              <Carro cor={c.cor} escura={c.escura} />
            </g>
          );
        })}

        <g transform={`translate(${FAIXA_DIR} ${yV})`}>
          <Carro cor={C.vermelho} escura={C.vermelhoEscuro} />
        </g>
        <g transform={`translate(${xA} ${yA}) rotate(${ang})`}>
          <Carro cor={C.azul} escura={C.azulEscuro} setaEsq={setaEsq} setaDir={setaDir} piscando={piscando} />
        </g>

        {/* distância lateral */}
        {ladoALado > 0.01 && (
          <g opacity={ladoALado}>
            {(() => {
              const x1 = xA + LARGURA_CARRO / 2 + 6;
              const x2 = FAIXA_DIR - LARGURA_CARRO / 2 - 6;
              const y = (yA + yV) / 2;
              return (
                <g>
                  <line x1={x1 + 14} y1={y} x2={x2 - 14} y2={y} stroke="white" strokeWidth={6} />
                  <path d={`M ${x1} ${y} l 20 -14 l 0 28 Z`} fill="white" />
                  <path d={`M ${x2} ${y} l -20 -14 l 0 28 Z`} fill="white" />
                </g>
              );
            })()}
          </g>
        )}

        {/* balão "LIVRE" na faixa da esquerda */}
        {livre && (
          <g transform={`translate(${FAIXA_ESQ} ${yA - 300}) scale(${spring({ frame: frame - 215, fps, config: { damping: 10 } })})`}>
            <rect x={-120} y={-44} width={240} height={88} rx={44} fill={C.verde} />
            <text textAnchor="middle" y={18} fontFamily={fontFamily} fontWeight={900} fontSize={50} fill={MARCA.azul1}>
              LIVRE
            </text>
          </g>
        )}
      </svg>

      {ladoALado > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: Math.min(yA, yV) - COMPRIMENTO / 2 - 110,
            textAlign: "center",
            opacity: ladoALado,
            color: "white",
            fontSize: 34,
            fontWeight: 800,
            textShadow: "0 3px 8px rgba(0,0,0,0.7)",
          }}
        >
          distância lateral
          <br />
          de segurança
        </div>
      )}

      <Instrucao f={frame} fps={fps} />
      {frame >= T.olhar[0] && <PainelSetas esq={setaEsq} dir={setaDir} piscando={piscando} />}

      {/* título */}
      {titulo > 0 && (
        <AbsoluteFill style={{ background: `rgba(27,31,59,${0.82 * titulo})`, justifyContent: "center", alignItems: "center", opacity: titulo }}>
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: 46, fontWeight: 600, color: MARCA.ciano, letterSpacing: 6 }}>COMO MANDA O CTB</div>
            <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 1.05, marginTop: 20 }}>
              ULTRAPASSAGEM
              <br />
              <span style={{ color: MARCA.ouro }}>PELA ESQUERDA</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* manobra concluída */}
      {frame > T.volta[1] + 10 && (
        <div
          style={{
            position: "absolute",
            top: 820,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${ok})`,
          }}
        >
          <div style={{ background: C.verde, color: MARCA.azul1, fontSize: 56, fontWeight: 900, padding: "22px 48px", borderRadius: 60 }}>
            MANOBRA CORRETA
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const RESUMO = [
  { texto: "Confira se a faixa da esquerda está livre", lei: "art. 29, X" },
  { texto: "Seta para a esquerda, com antecedência", lei: "art. 29, XI, a" },
  { texto: "Ultrapasse pela esquerda, com distância lateral", lei: "art. 29, IX e XI, b" },
  { texto: "Seta para a direita e volte à faixa de origem", lei: "art. 29, XI, c" },
];

const CenaResumo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = (atraso) => spring({ frame: frame - atraso, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, ${MARCA.azul2}, ${MARCA.azul1})`,
        fontFamily,
        padding: "150px 70px",
        color: "white",
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 600, color: MARCA.ciano, letterSpacing: 5, opacity: entrada(0) }}>RESUMINDO</div>
      <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.05, marginTop: 10, opacity: entrada(0) }}>
        Ultrapassagem <span style={{ color: MARCA.ouro }}>segura</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 70 }}>
        {RESUMO.map((r, i) => {
          const e = entrada(14 + i * 12);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                background: "rgba(255,255,255,0.08)",
                borderRadius: 30,
                padding: "28px 32px",
                opacity: e,
                transform: `translateX(${interpolate(e, [0, 1], [-120, 0])}px)`,
              }}
            >
              <div style={{ minWidth: 84, height: 84, borderRadius: 42, background: MARCA.ouro, color: MARCA.azul1, fontSize: 52, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15 }}>{r.texto}</div>
                <div style={{ fontSize: 32, fontWeight: 600, color: MARCA.ciano, marginTop: 6 }}>CTB, {r.lei}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 70,
          background: "#e63946",
          borderRadius: 30,
          padding: "30px 36px",
          fontSize: 42,
          fontWeight: 800,
          lineHeight: 1.2,
          opacity: entrada(80),
          transform: `scale(${interpolate(entrada(80), [0, 1], [0.8, 1])})`,
        }}
      >
        Mudar de faixa sem dar seta é infração grave
        <div style={{ fontSize: 32, fontWeight: 600, marginTop: 8, opacity: 0.9 }}>CTB, art. 196</div>
      </div>
    </AbsoluteFill>
  );
};

export const Ultrapassagem = () => (
  <AbsoluteFill style={{ background: C.grama }}>
    <Sequence durationInFrames={DURACAO_PISTA}>
      <CenaPista />
    </Sequence>
    <Sequence from={DURACAO_PISTA} durationInFrames={DURACAO_RESUMO}>
      <CenaResumo />
    </Sequence>
    <Sequence from={DURACAO_PISTA + DURACAO_RESUMO} durationInFrames={DURACAO_MARCA}>
      <Marca />
    </Sequence>
  </AbsoluteFill>
);
