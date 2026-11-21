import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../fonte";
import { Apartamento, brl } from "../Elementos";
import { Caio } from "../Personagens";
import { PC } from "../cores";

const Relogio = ({ frame }) => {
  const min = frame * 2.2;
  return (
    <svg viewBox="-110 -110 220 220" width="250" height="250">
      <circle r="100" fill="#fff" stroke={PC.tinta} strokeWidth="10" />
      {[...Array(12)].map((_, i) => (
        <rect key={i} x="-3" y="-90" width="6" height="14" fill={PC.tinta} transform={`rotate(${i * 30})`} />
      ))}
      <rect x="-5" y="-52" width="10" height="56" rx="5" fill={PC.tinta} transform={`rotate(${min / 12 + 250})`} />
      <rect x="-3.5" y="-80" width="7" height="86" rx="3.5" fill={PC.alerta} transform={`rotate(${min})`} />
      <circle r="9" fill={PC.tinta} />
    </svg>
  );
};

// 28-36s: Caio olha pro saldo, pra mensagem, pro relógio. Cada olhar vira um pensamento.
export const Olhar = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fase = frame < 80 ? 0 : frame < 160 ? 1 : 2;
  const t = frame - fase * 80;
  const caio = spring({ frame, fps, config: { damping: 13 } });
  const troca = spring({ frame: t, fps, config: { damping: 10, stiffness: 170 } });
  const pupilas = fase === 2 ? [-0.7, -0.7] : fase === 1 ? [0.9, 0.7] : [0.9, 0.9];
  const tremor = 0.8 + fase * 1.2;

  const itens = [
    { rotulo: "O SALDO", cor: PC.pix, conteudo: <div style={{ fontFamily, fontWeight: 900, fontSize: 100, color: PC.pix, letterSpacing: -2 }}>{brl(12847.32)}</div> },
    {
      rotulo: "A MENSAGEM",
      cor: PC.alerta,
      conteudo: (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 100 }}>✉️</div>
          <div style={{ fontFamily, fontWeight: 900, fontSize: 64, color: PC.alerta }}>NÃO GASTA.</div>
        </div>
      ),
    },
    {
      rotulo: "O RELÓGIO",
      cor: PC.amarelo,
      conteudo: (
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Relogio frame={frame} />
          <div style={{ fontFamily, fontWeight: 900, fontSize: 64, color: PC.amarelo, lineHeight: 1.1 }}>VENCE<br />HOJE</div>
        </div>
      ),
    },
  ];
  const atual = itens[fase];

  return (
    <AbsoluteFill>
      <Apartamento />
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 270,
          height: 430,
          borderRadius: 120,
          background: "#fff",
          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transform: `scale(${interpolate(troca, [0, 1], [0.82, 1])})`,
          opacity: Math.min(1, troca * 1.6),
        }}
      >
        <div style={{ fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: 6, color: "#6b7390", background: "#eef1f7", padding: "6px 30px", borderRadius: 999 }}>{atual.rotulo}</div>
        {atual.conteudo}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        {[[540, 760, 18], [540, 830, 28], [540, 910, 40]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity="0.95" />
        ))}
        <g transform={`translate(540 ${interpolate(caio, [0, 1], [1800, 1330])}) scale(1.25)`}>
          <Caio boca="tensa" sobrancelha="choque" pupilas={pupilas} tela={fase === 1 ? PC.alerta : PC.pix} tremor={tremor} suor />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
