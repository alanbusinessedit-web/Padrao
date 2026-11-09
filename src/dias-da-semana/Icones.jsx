import { useCurrentFrame } from "remotion";
import { fontFamily } from "../fonte";

// Ícones flat desenhados em torno de 0,0 (cabem num círculo de raio ~160).
const PRATA = "#dfe4ea";
const PRATA2 = "#a4b0be";
const OURO = "#ffd166";
const OURO2 = "#e0a800";
const PELE = "#ffd6a5";
const ESC = "#2b2d42";
const BR = "#ffffff";

const Lua = () => (
  <g transform="translate(40 0) rotate(-20)">
    <path d="M 0 -150 A 150 150 0 0 0 0 150 A 70 150 0 0 1 0 -150 Z" fill={PRATA} />
    <circle cx={-105} cy={-10} r={16} fill={PRATA2} />
    <circle cx={-80} cy={-80} r={10} fill={PRATA2} />
    <circle cx={-85} cy={75} r={12} fill={PRATA2} />
  </g>
);

const Sol = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <g transform={`rotate(${frame * 0.6})`}>
        {new Array(12).fill(0).map((_, i) => (
          <path key={i} d="M -18 -112 L 0 -165 L 18 -112 Z" fill={OURO} transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <circle r={100} fill={OURO} />
      <circle r={78} fill="#ffe066" />
    </g>
  );
};

const Marte = () => (
  <g>
    {/* lança atrás */}
    <rect x={-8} y={-170} width={16} height={340} rx={8} fill="#8d6e63" transform="rotate(35)" />
    <path d="M -22 -170 L 0 -215 L 22 -170 Z" fill={PRATA} transform="rotate(35)" />
    {/* elmo romano com crista */}
    <path d="M -110 -40 Q -110 -150 0 -150 Q 110 -150 110 -40 Z" fill="#e63946" transform="translate(0 -40) scale(0.9 0.7)" />
    <path d="M -100 90 L -100 -10 Q -100 -110 0 -110 Q 100 -110 100 -10 L 100 90 L 50 90 L 50 10 L -50 10 L -50 90 Z" fill={OURO2} />
    <rect x={-50} y={10} width={100} height={30} fill={ESC} />
    <rect x={-12} y={10} width={24} height={70} fill={ESC} />
  </g>
);

const Tyr = () => (
  <g transform="rotate(-20)">
    <path d="M -26 -150 L 0 -190 L 26 -150 L 26 60 L -26 60 Z" fill={PRATA} />
    <rect x={-4} y={-170} width={8} height={220} fill={PRATA2} />
    <rect x={-90} y={60} width={180} height={28} rx={14} fill={OURO2} />
    <rect x={-16} y={88} width={32} height={70} rx={8} fill="#6d4c41" />
    <circle cy={170} r={22} fill={OURO2} />
  </g>
);

const Asa = ({ lado }) => (
  <g transform={`scale(${lado} 1)`}>
    <path d="M 80 -10 Q 150 -90 190 -110 Q 175 -60 150 -40 Q 180 -50 195 -55 Q 170 -10 130 0 Q 160 0 170 5 Q 130 35 85 25 Z" fill={BR} />
  </g>
);

const Mercurio = () => (
  <g transform="translate(0 20)">
    <Asa lado={1} />
    <Asa lado={-1} />
    <path d="M -95 30 Q -95 -100 0 -100 Q 95 -100 95 30 Z" fill={OURO2} />
    <rect x={-130} y={20} width={260} height={34} rx={17} fill={OURO} />
  </g>
);

const Odin = () => (
  <g>
    <path d="M -80 -40 Q -90 140 0 170 Q 90 140 80 -40 Z" fill={PRATA2} />
    <circle cy={-50} r={80} fill={PELE} />
    <path d="M -80 -30 Q -60 90 0 100 Q 60 90 80 -30 Q 50 10 0 10 Q -50 10 -80 -30 Z" fill={PRATA} />
    <circle cx={30} cy={-60} r={10} fill={ESC} />
    <path d="M -70 -95 L 70 -40" stroke={ESC} strokeWidth={10} />
    <circle cx={-30} cy={-60} r={22} fill={ESC} />
    <path d="M -170 -110 Q 0 -150 170 -110 Q 0 -90 -170 -110 Z" fill="#5c4033" />
    <path d="M -70 -115 Q -60 -200 0 -205 Q 60 -200 70 -115 Z" fill="#5c4033" />
  </g>
);

const Jupiter = () => (
  <g>
    <g fill={PRATA}>
      <circle cx={-60} cy={-60} r={60} />
      <circle cx={20} cy={-90} r={75} />
      <circle cx={90} cy={-50} r={55} />
      <rect x={-120} y={-60} width={265} height={55} rx={27} />
    </g>
    <path d="M 10 -20 L -50 80 L 0 80 L -30 175 L 70 50 L 20 50 L 55 -20 Z" fill={OURO} />
  </g>
);

const Thor = () => (
  <g transform="rotate(-25)">
    <rect x={-18} y={-30} width={36} height={190} rx={12} fill="#8d6e63" />
    <circle cy={165} r={20} fill="#6d4c41" />
    <rect x={-120} y={-150} width={240} height={130} rx={24} fill={PRATA2} />
    <rect x={-120} y={-150} width={240} height={40} rx={20} fill={PRATA} />
    <path d="M 130 -120 L 165 -150 L 150 -100 L 180 -105 L 140 -60" stroke={OURO} strokeWidth={12} fill="none" strokeLinejoin="round" />
  </g>
);

const Coracao = ({ escala = 1, cor = "#ff4d6d", x = 0, y = 0 }) => (
  <path
    transform={`translate(${x} ${y}) scale(${escala})`}
    d="M 0 40 C -60 0 -50 -50 -20 -46 C -8 -44 0 -34 0 -26 C 0 -34 8 -44 20 -46 C 50 -50 60 0 0 40 Z"
    fill={cor}
  />
);

const Venus = () => {
  const frame = useCurrentFrame();
  const bat = 1 + 0.08 * Math.max(0, Math.sin(frame / 5));
  return (
    <g>
      <circle cy={-50} r={85} stroke={BR} strokeWidth={30} fill="none" />
      <rect x={-15} y={35} width={30} height={135} rx={10} fill={BR} />
      <rect x={-65} y={95} width={130} height={30} rx={10} fill={BR} />
      <Coracao escala={1.1 * bat} y={-55} />
    </g>
  );
};

const Frigg = () => (
  <g>
    <path d="M -140 40 L -140 -90 L -70 -20 L 0 -120 L 70 -20 L 140 -90 L 140 40 Z" fill={OURO} />
    <rect x={-150} y={30} width={300} height={60} rx={14} fill={OURO2} />
    {[-140, 0, 140].map((x) => (
      <circle key={x} cx={x} cy={x === 0 ? -125 : -95} r={16} fill={OURO} />
    ))}
    <Coracao escala={0.9} y={62} />
  </g>
);

const Saturno = () => (
  <g transform="rotate(-18)">
    <path d="M -170 0 A 170 50 0 0 1 170 0" stroke="#c9a227" strokeWidth={22} fill="none" />
    <circle r={100} fill={OURO} />
    <path d="M -95 -30 Q 0 -10 95 -30" stroke={OURO2} strokeWidth={14} fill="none" />
    <path d="M -100 20 Q 0 40 100 20" stroke={OURO2} strokeWidth={10} fill="none" />
    <path d="M -170 0 A 170 50 0 0 0 170 0" stroke="#f1c40f" strokeWidth={22} fill="none" />
  </g>
);

const Bispo = () => (
  <g transform="translate(-20 10)">
    {/* báculo */}
    <rect x={118} y={-130} width={14} height={300} rx={7} fill={OURO2} />
    <path d="M 125 -125 Q 125 -190 175 -185 Q 215 -175 200 -140 Q 185 -115 160 -135" stroke={OURO2} strokeWidth={14} fill="none" strokeLinecap="round" />
    {/* manto */}
    <path d="M -110 170 Q -110 0 0 -10 Q 110 0 110 170 Z" fill="#7b2cbf" />
    <rect x={-14} y={0} width={28} height={170} fill={OURO} />
    {/* rosto */}
    <circle cy={-60} r={58} fill={PELE} />
    <path d="M -40 -30 Q 0 10 40 -30 Q 30 0 0 4 Q -30 0 -40 -30 Z" fill={PRATA} />
    <circle cx={-20} cy={-66} r={6} fill={ESC} />
    <circle cx={20} cy={-66} r={6} fill={ESC} />
    {/* mitra */}
    <path d="M -55 -95 L -45 -175 L 0 -215 L 45 -175 L 55 -95 Z" fill={BR} />
    <rect x={-6} y={-190} width={12} height={70} fill={OURO2} />
    <rect x={-26} y={-168} width={52} height={12} fill={OURO2} />
    {/* mão */}
    <circle cx={125} cy={20} r={20} fill={PELE} />
  </g>
);

const Feira = () => (
  <g transform="translate(0 10)">
    <rect x={-140} y={-60} width={14} height={200} fill="#8d6e63" />
    <rect x={126} y={-60} width={14} height={200} fill="#8d6e63" />
    {/* toldo listrado */}
    <path d="M -160 -60 L -130 -150 L 130 -150 L 160 -60 Z" fill={BR} />
    {[0, 2, 4].map((i) => (
      <path key={i} d={`M ${-160 + i * 64} -60 L ${-130 + i * 52} -150 L ${-78 + i * 52} -150 L ${-96 + i * 64} -60 Z`} fill="#e63946" />
    ))}
    {new Array(5).fill(0).map((_, i) => (
      <path key={i} d={`M ${-160 + i * 64} -60 A 32 32 0 0 0 ${-96 + i * 64} -60 Z`} fill={i % 2 ? BR : "#e63946"} />
    ))}
    {/* balcão com frutas */}
    <rect x={-165} y={60} width={330} height={90} rx={12} fill="#a0522d" />
    {[
      [-110, "#ff6b6b"],
      [-60, "#ffa94d"],
      [-10, "#ffd43b"],
      [40, "#69db7c"],
      [90, "#ff6b6b"],
    ].map(([x, c]) => (
      <circle key={x} cx={x} cy={42} r={26} fill={c} />
    ))}
  </g>
);

const Tabuas = () => (
  <g>
    {[-75, 75].map((x) => (
      <g key={x} transform={`translate(${x} 0) rotate(${x > 0 ? 6 : -6})`}>
        <path d="M -70 150 L -70 -100 A 70 70 0 0 1 70 -100 L 70 150 Z" fill="#ced4da" />
        <path d="M -70 150 L -70 -100 A 70 70 0 0 1 70 -100 L 70 150 Z" fill="none" stroke="#868e96" strokeWidth={8} />
        {new Array(5).fill(0).map((_, i) => (
          <rect key={i} x={-45} y={-80 + i * 45} width={90} height={12} rx={6} fill="#868e96" />
        ))}
      </g>
    ))}
    <circle cx={0} cy={-170} r={42} fill={OURO} />
    <text y={-152} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={54} fill={ESC}>
      7
    </text>
  </g>
);

const Constantino = () => (
  <g>
    {[-1, 1].map((lado) => (
      <g key={lado} transform={`scale(${lado} 1)`}>
        <path d="M -45 140 A 150 150 0 0 1 -75 -130" stroke="#2b9348" strokeWidth={12} fill="none" transform="translate(-10 0)" />
        {new Array(8).fill(0).map((_, i) => {
          const graus = 115 + i * 18;
          const a = (graus * Math.PI) / 180;
          const x = 150 * Math.cos(a);
          const y = 150 * Math.sin(a);
          return <ellipse key={i} cx={x} cy={y} rx={15} ry={34} fill="#55a630" transform={`rotate(${graus + 60} ${x} ${y})`} />;
        })}
      </g>
    ))}
    <text y={30} textAnchor="middle" fontFamily={fontFamily} fontWeight={900} fontSize={96} fill={BR}>
      321
    </text>
    <text y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={OURO} letterSpacing={3}>
      D.C.
    </text>
  </g>
);

export const ICONES = {
  lua: Lua,
  sol: Sol,
  marte: Marte,
  tyr: Tyr,
  mercurio: Mercurio,
  odin: Odin,
  jupiter: Jupiter,
  thor: Thor,
  venus: Venus,
  frigg: Frigg,
  saturno: Saturno,
  bispo: Bispo,
  feira: Feira,
  tabuas: Tabuas,
  constantino: Constantino,
};

export const Icone = ({ nome }) => {
  const C = ICONES[nome];
  return C ? <C /> : null;
};
