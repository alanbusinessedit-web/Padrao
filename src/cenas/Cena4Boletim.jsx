import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES } from "../config";
import { fontFamily } from "../fonte";
import { CaixaTexto } from "../components/CaixaTexto";
import { Fundo } from "../components/Fundo";

const PAPEL_X = 310;
const PAPEL_L = 460;
const PAPEL_A = 780;
const FENDA_Y = 648;

const LINHAS = [
  { numero: "A", barra: 260, votos: "347", cor: CORES.vermelho },
  { numero: "B", barra: 200, votos: "289", cor: CORES.ciano },
  { numero: "C", barra: 110, votos: "126", cor: CORES.amarelo },
  { numero: "BR", barra: 40, votos: "18", cor: CORES.cinzaUrna2 },
];

const Boletim = () => {
  const texto = { fontFamily, fill: CORES.roxoClaro };
  return (
    <g>
      <rect x={0} y={0} width={PAPEL_L} height={PAPEL_A} fill="#fffdf7" />
      <rect x={0} y={PAPEL_A - 30} width={PAPEL_L} height={30} fill="#f1ede1" />
      <text x={PAPEL_L / 2} y={70} textAnchor="middle" {...texto} fontWeight={900} fontSize={38}>
        BOLETIM DE URNA
      </text>
      <text x={PAPEL_L / 2} y={112} textAnchor="middle" {...texto} fontWeight={600} fontSize={22}>
        ZONA 0045 • SEÇÃO 0123
      </text>
      {new Array(14).fill(0).map((_, i) => (
        <rect key={i} x={30 + i * 29} y={140} width={16} height={5} rx={2} fill={CORES.cinzaUrna2} />
      ))}

      {LINHAS.map((l, i) => (
        <g key={l.numero} transform={`translate(30 ${180 + i * 82})`}>
          <rect x={0} y={0} width={64} height={56} rx={10} fill={l.cor} />
          <text x={32} y={38} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={26} fill={CORES.branco}>
            {l.numero}
          </text>
          <rect x={80} y={16} width={l.barra} height={24} rx={12} fill={CORES.cinzaUrna} />
          <text x={400} y={38} textAnchor="end" {...texto} fontWeight={900} fontSize={30}>
            {l.votos}
          </text>
        </g>
      ))}

      <rect x={30} y={520} width={PAPEL_L - 60} height={4} rx={2} fill={CORES.cinzaUrna2} />
      <text x={30} y={565} {...texto} fontWeight={800} fontSize={26}>
        TOTAL
      </text>
      <text x={PAPEL_L - 30} y={565} textAnchor="end" {...texto} fontWeight={900} fontSize={26}>
        780
      </text>

      {/* QR code estilizado */}
      <g transform="translate(30 595)">
        {new Array(64).fill(0).map((_, i) => {
          const c = i % 8;
          const l = Math.floor(i / 8);
          const canto = (c < 2 && l < 2) || (c > 5 && l < 2) || (c < 2 && l > 5);
          if (!canto && random(`qr-${i}`) < 0.45) return null;
          return <rect key={i} x={c * 17} y={l * 17} width={15} height={15} rx={3} fill={CORES.roxo} />;
        })}
      </g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={190} y={612 + i * 30} width={240 - i * 40} height={14} rx={7} fill={CORES.cinzaUrna} />
      ))}
    </g>
  );
};

// Cena 4 (18-24s): o boletim é impresso e desliza para fora da urna.
export const Cena4Boletim = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entradaImpressora = spring({ frame, fps, config: { damping: 13 } });

  // impressão em "passos", como uma impressora térmica
  const base = interpolate(frame, [12, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const passos = base + (frame > 12 && frame < 105 ? Math.sin(frame * 1.6) * 0.006 : 0);
  const papelY = FENDA_Y - PAPEL_A + passos * PAPEL_A;

  // depois de impresso, o papel se solta e desliza levemente, girando
  const solta = spring({ frame: frame - 112, fps, config: { damping: 12 } });
  const giro = interpolate(solta, [0, 1], [0, -5]);
  const deslize = interpolate(solta, [0, 1], [0, 40]);
  const led = frame < 105 ? Math.floor(frame / 5) % 2 : 1;

  return (
    <AbsoluteFill>
      <Fundo de={CORES.teal} para={CORES.tealEscuro} seed="cena4" />
      <CaixaTexto texto="BOLETIM DE URNA" atraso={12} top={200} tamanho={100} fundo="rgba(255,209,102,0.22)" />

      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="abaixo-da-fenda">
            <rect x={0} y={FENDA_Y} width={1080} height={1920} />
          </clipPath>
        </defs>

        <g transform={`translate(0 ${interpolate(entradaImpressora, [0, 1], [-400, 0])})`}>
          <g clipPath={solta > 0.01 ? undefined : "url(#abaixo-da-fenda)"}>
            <g
              transform={`translate(${PAPEL_X} ${papelY + deslize}) rotate(${giro} ${PAPEL_L / 2} 0)`}
              opacity={papelY < FENDA_Y - PAPEL_A + 1 ? 0 : 1}
            >
              <rect x={14} y={18} width={PAPEL_L} height={PAPEL_A} fill="#000" opacity={0.15} />
              <Boletim />
            </g>
          </g>

          {/* topo da urna com a fenda da impressora */}
          <rect x={220} y={540} width={640} height={130} rx={34} fill={CORES.cinzaUrna2} />
          <rect x={220} y={530} width={640} height={120} rx={34} fill={CORES.cinzaUrna} />
          <rect x={290} y={636} width={500} height={18} rx={9} fill={CORES.grafite} />
          <circle cx={815} cy={575} r={14} fill={led ? CORES.verde : "#2d6a4f"} />
          <rect x={265} y={565} width={180} height={20} rx={10} fill={CORES.cinzaUrna2} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
