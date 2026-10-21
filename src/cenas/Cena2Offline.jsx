import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES } from "../config";
import { fontFamily } from "../fonte";
import { CaixaTexto } from "../components/CaixaTexto";
import { Fundo } from "../components/Fundo";

// Ordem em que as teclas são "pressionadas" (índice, frame).
const DIGITOS = [
  { tecla: 1, frame: 55 },
  { tecla: 3, frame: 68 },
  { tecla: 10, frame: 81 }, // tecla "0"
];
const FRAME_CONFIRMA = 100;

const Urna = ({ frame }) => {
  const teclas = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];
  const confirmou = frame >= FRAME_CONFIRMA;

  return (
    <g>
      <ellipse cx={540} cy={1365} rx={340} ry={30} fill="#000" opacity={0.18} />
      {/* corpo com volume (camadas de tons, sem contorno) */}
      <rect x={200} y={840} width={690} height={490} rx={42} fill={CORES.cinzaUrna2} />
      <rect x={190} y={820} width={690} height={470} rx={42} fill={CORES.cinzaUrna} />
      <rect x={190} y={820} width={690} height={60} rx={30} fill="#f8f9fa" />

      {/* tela */}
      <rect x={240} y={890} width={330} height={250} rx={20} fill={CORES.roxo} />
      <rect x={256} y={906} width={298} height={218} rx={12} fill={confirmou ? "#d8f3dc" : "#e0fbfc"} />
      {confirmou ? (
        <text x={405} y={1040} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={84} fill="#2d6a4f">
          FIM
        </text>
      ) : (
        <>
          <rect x={280} y={935} width={150} height={18} rx={9} fill="#98c1d9" />
          <rect x={280} y={970} width={220} height={14} rx={7} fill="#c2dfe3" />
          {DIGITOS.map((d, i) => (
            <g key={i} opacity={frame >= d.frame ? 1 : 0.25}>
              <rect x={290 + i * 80} y={1010} width={64} height={84} rx={10} fill={CORES.branco} />
              {frame >= d.frame && (
                <text x={322 + i * 80} y={1072} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={54} fill={CORES.roxo}>
                  {d.tecla === 10 ? 0 : d.tecla}
                </text>
              )}
            </g>
          ))}
        </>
      )}
      <rect x={240} y={1170} width={330} height={70} rx={14} fill={CORES.cinzaUrna2} />
      <text x={405} y={1215} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={CORES.grafite}>
        JUSTIÇA ELEITORAL
      </text>

      {/* teclado */}
      <rect x={605} y={890} width={240} height={350} rx={20} fill={CORES.grafite} />
      {teclas.map((n, i) => {
        if (n === null) return null;
        const col = i % 3;
        const lin = Math.floor(i / 3);
        const press = DIGITOS.find((d) => d.tecla === (n === 0 ? 10 : n));
        const apertada = press && frame >= press.frame && frame < press.frame + 6;
        return (
          <g key={i} transform={`translate(0 ${apertada ? 4 : 0})`}>
            <rect x={627 + col * 70} y={910 + lin * 54} width={56} height={44} rx={9} fill={apertada ? CORES.amarelo : "#343a40"} />
            <text x={655 + col * 70} y={941 + lin * 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={CORES.branco}>
              {n}
            </text>
          </g>
        );
      })}
      <rect x={622} y={1135} width={64} height={80} rx={10} fill={CORES.branco} />
      <rect x={694} y={1135} width={64} height={80} rx={10} fill="#f4a261" />
      <rect
        x={766}
        y={1135 + (frame >= FRAME_CONFIRMA && frame < FRAME_CONFIRMA + 6 ? 4 : 0)}
        width={64}
        height={80}
        rx={10}
        fill={confirmou ? CORES.verde : "#40916c"}
      />
    </g>
  );
};

const WifiBloqueado = ({ frame, fps }) => {
  const bloqueio = spring({ frame: frame - 32, fps, config: { damping: 9, stiffness: 150 } });
  const tremor = frame > 32 && frame < 48 ? Math.sin(frame * 2.2) * 10 * (1 - (frame - 32) / 16) : 0;
  const cx = 540;
  const cy = 720;

  const arco = (r) => {
    const a1 = (-135 * Math.PI) / 180;
    const a2 = (-45 * Math.PI) / 180;
    return `M ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)}`;
  };

  return (
    <g transform={`translate(${tremor} 0)`}>
      {[50, 100, 150].map((r, i) => {
        // antes do bloqueio o sinal "pisca" em ondas; depois fica apagado
        const onda = 0.5 + 0.5 * Math.sin(frame / 4 - i);
        const opacidade = interpolate(bloqueio, [0, 1], [0.4 + 0.6 * onda, 0.25]);
        return <path key={r} d={arco(r)} stroke={CORES.ciano} strokeWidth={26} strokeLinecap="round" fill="none" opacity={opacidade} />;
      })}
      <circle cx={cx} cy={cy} r={18} fill={CORES.ciano} opacity={interpolate(bloqueio, [0, 1], [1, 0.25])} />

      <g transform={`translate(${cx} ${cy - 70}) scale(${bloqueio}) translate(${-cx} ${-(cy - 70)})`}>
        <circle cx={cx} cy={cy - 70} r={165} stroke={CORES.vermelho} strokeWidth={30} fill="none" />
        <line x1={cx - 117} y1={cy - 70 + 117} x2={cx + 117} y2={cy - 70 - 117} stroke={CORES.vermelho} strokeWidth={30} strokeLinecap="round" />
      </g>
    </g>
  );
};

// Cena 2 (5-11s): urna eletrônica + Wi-Fi bloqueado. "100% OFF-LINE".
export const Cena2Offline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entradaUrna = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  const flutua = Math.sin(frame / 18) * 8;

  return (
    <AbsoluteFill>
      <Fundo de={CORES.roxo} para={CORES.roxoClaro} seed="cena2" />
      <CaixaTexto texto="100% OFF-LINE" atraso={10} top={250} tamanho={104} fundo="rgba(76,201,240,0.18)" />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <WifiBloqueado frame={frame} fps={fps} />
        <g transform={`translate(0 ${interpolate(entradaUrna, [0, 1], [500, 0]) + flutua})`}>
          <Urna frame={frame} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
