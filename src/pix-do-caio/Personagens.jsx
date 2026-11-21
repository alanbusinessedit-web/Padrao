import { useCurrentFrame } from "remotion";
import { PC } from "./cores";

// Caio: 23 anos, magro, cabelo bagunçado castanho claro, camiseta cinza desbotada,
// short de moletom, olhos grandes, sobrancelha levantada de estresse, sempre com o celular.
// Origem (0,0) = quadril; pés em y≈235; topo da cabeça em y≈-455.
//   boca: "o" | "aberta" | "reta" | "tensa"
//   pupilas: [dx, dy] de -1 a 1 (para onde ele olha)
//   sobrancelha: "estresse" | "choque"
export const Caio = ({ boca = "tensa", pupilas = [0, 0], sobrancelha = "estresse", celular = true, tela = PC.pix, tremor = 0, suor = false, mao = "peito" }) => {
  const frame = useCurrentFrame();
  const respira = Math.sin(frame / 14) * 3;
  const treme = tremor ? Math.sin(frame * 2.7) * tremor : 0;
  const piscando = frame % 120 > 115;
  const choque = sobrancelha === "choque";
  const yB = choque ? -452 : -432;
  const [px, py] = pupilas;

  return (
    <g transform={`translate(${treme} 0)`}>
      {/* pernas */}
      <rect x="-64" y="60" width="50" height="172" rx="22" fill={PC.pele} />
      <rect x="14" y="60" width="50" height="172" rx="22" fill={PC.pele} />
      <ellipse cx="-42" cy="236" rx="46" ry="20" fill={PC.tenis} />
      <ellipse cx="42" cy="236" rx="46" ry="20" fill={PC.tenis} />
      <rect x="-86" y="222" width="90" height="10" rx="5" fill="#cfd4df" />
      <rect x="-4" y="222" width="90" height="10" rx="5" fill="#cfd4df" />
      {/* short de moletom */}
      <path d="M -88 -22 L 88 -22 L 96 96 L 8 96 L 0 44 L -8 96 L -96 96 Z" fill={PC.moletom} />
      <rect x="-88" y="-22" width="176" height="16" fill="#4a4d60" />
      {/* tronco (camiseta) */}
      <g transform={`translate(0 ${respira * 0.4})`}>
        <path d="M -98 -250 Q -104 -284 -60 -292 L 60 -292 Q 104 -284 98 -250 L 92 -14 L -92 -14 Z" fill={PC.camiseta} />
        <ellipse cx="0" cy="-292" rx="34" ry="16" fill={PC.pele} />
        <path d="M -34 -292 Q 0 -262 34 -292" fill="none" stroke="#7d8798" strokeWidth="8" />
        {/* braço esquerdo caído */}
        <path d="M -92 -262 Q -140 -170 -116 -70" fill="none" stroke={PC.pele} strokeWidth="38" strokeLinecap="round" />
        <path d="M -108 -284 L -60 -292 L -88 -196 Q -118 -196 -126 -200 Z" fill={PC.camiseta} />
        <circle cx="-114" cy="-52" r="22" fill={PC.pele} />
        {/* braço direito com celular */}
        {celular && (
          <g>
            <circle cx="60" cy="-190" r="80" fill={tela} opacity={0.16 + 0.06 * Math.sin(frame / 8)} />
            <path d="M 92 -262 L 150 -168 L 58 -176" fill="none" stroke={PC.pele} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 112 -290 L 60 -292 L 92 -196 Q 126 -196 136 -204 Z" fill={PC.camiseta} />
            <g transform="rotate(-8 40 -190)">
              <rect x="6" y="-262" width="76" height="130" rx="14" fill="#14142b" />
              <rect x="12" y="-254" width="64" height="112" rx="8" fill={tela} opacity="0.95" />
              <circle cx="44" cy="-196" r="14" fill="#ffffff" opacity="0.5" />
              <circle cx="22" cy="-172" r="20" fill={PC.pele} />
            </g>
          </g>
        )}
        {!celular && <path d="M 92 -262 Q 140 -170 116 -70" fill="none" stroke={PC.pele} strokeWidth="38" strokeLinecap="round" />}
      </g>
      {/* pescoço e cabeça */}
      <g transform={`translate(0 ${respira})`}>
        <rect x="-26" y="-330" width="52" height="46" fill={PC.pele} />
        <circle cx="-86" cy="-364" r="16" fill={PC.pele} />
        <circle cx="86" cy="-364" r="16" fill={PC.pele} />
        <circle cx="0" cy="-372" r="88" fill={PC.pele} />
        {/* cabelo bagunçado */}
        <path d="M -92 -372 Q -102 -470 -24 -466 Q 6 -496 46 -474 Q 106 -460 92 -372 Q 78 -418 48 -410 Q 30 -444 4 -412 Q -26 -440 -50 -408 Q -74 -404 -92 -372 Z" fill={PC.cabelo} />
        <path d="M -30 -462 L -48 -500 L -6 -472 Z" fill={PC.cabelo} />
        <path d="M 24 -472 L 52 -506 L 56 -466 Z" fill={PC.cabelo} />
        <path d="M 70 -430 L 108 -440 L 84 -404 Z" fill={PC.cabelo} />
        {/* olhos grandes */}
        {[-32, 32].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="-372" rx="27" ry={piscando ? 3 : 32} fill="#ffffff" stroke={PC.tinta} strokeWidth="4" />
            {!piscando && (
              <>
                <circle cx={x + px * 9} cy={-372 + py * 12} r="17" fill={PC.tinta} />
                <circle cx={x + px * 9 + 5} cy={-372 + py * 12 - 6} r="5" fill="#ffffff" />
              </>
            )}
          </g>
        ))}
        {/* sobrancelhas levantadas */}
        <path d={`M -64 ${yB + 18} Q -38 ${yB - 6} -10 ${yB - 12}`} fill="none" stroke="#5b4636" strokeWidth="9" strokeLinecap="round" />
        <path d={`M 64 ${yB + 18} Q 38 ${yB - 6} 10 ${yB - 12}`} fill="none" stroke="#5b4636" strokeWidth="9" strokeLinecap="round" />
        {/* boca pequena */}
        {boca === "o" && <ellipse cx="0" cy="-318" rx="13" ry="19" fill="#7a2e3a" />}
        {boca === "aberta" && (
          <g>
            <ellipse cx="0" cy="-316" rx="24" ry="28" fill="#7a2e3a" />
            <ellipse cx="0" cy="-304" rx="14" ry="10" fill="#e8667a" />
          </g>
        )}
        {boca === "reta" && <rect x="-12" y="-322" width="24" height="7" rx="3.5" fill="#7a2e3a" />}
        {boca === "sorriso" && (
          <g>
            <path d="M -26 -326 Q 0 -296 26 -326 Q 0 -318 -26 -326 Z" fill="#7a2e3a" stroke="#7a2e3a" strokeWidth="5" strokeLinejoin="round" />
            <path d="M -16 -322 Q 0 -312 16 -322 L 12 -318 Q 0 -312 -12 -318 Z" fill="#ffffff" />
          </g>
        )}
        {boca === "tensa" && <path d="M -20 -318 Q -10 -326 0 -318 Q 10 -310 20 -318" fill="none" stroke="#7a2e3a" strokeWidth="7" strokeLinecap="round" />}
        {suor && (
          <g>
            {[0, 1].map((i) => {
              const t = ((frame + i * 14) % 28) / 28;
              return (
                <path
                  key={i}
                  transform={`translate(${i ? 92 : -100} ${-420 + t * 70}) scale(${1 - t * 0.3})`}
                  d="M 0 -14 Q 12 4 0 12 Q -12 4 0 -14 Z"
                  fill="#7fd6ff"
                  opacity={1 - t * 0.7}
                />
              );
            })}
          </g>
        )}
      </g>
    </g>
  );
};

// Mãe do Caio: 48 anos, cabelo preso, camiseta de flor. Só busto, origem no centro da cabeça.
// `fala` anima a boca abrindo e fechando.
export const Mae = ({ fala = true, nervosa = true }) => {
  const frame = useCurrentFrame();
  const abre = fala ? Math.abs(Math.sin(frame / 2.6)) : 0;
  const flores = [[-90, 150], [-30, 190], [40, 145], [95, 195], [-60, 235], [60, 240], [0, 260]];
  return (
    <g>
      {/* coque e cabelo */}
      <circle cx="0" cy="-130" r="46" fill={PC.cabeloMae} />
      <path d="M -92 -10 Q -100 -112 0 -112 Q 100 -112 92 -10 Z" fill={PC.cabeloMae} />
      {/* camiseta de flor */}
      <path d="M -150 330 Q -160 160 -90 130 L 90 130 Q 160 160 150 330 Z" fill="#f4d35e" />
      {flores.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-14" rx="9" ry="14" fill={i % 2 ? "#ef476f" : "#ff8fab"} transform={`rotate(${a})`} />
          ))}
          <circle r="7" fill="#ff9f1c" />
        </g>
      ))}
      <rect x="-26" y="90" width="52" height="50" fill={PC.peleEscura} />
      <circle cx="-88" cy="12" r="15" fill={PC.peleEscura} />
      <circle cx="88" cy="12" r="15" fill={PC.peleEscura} />
      <circle cx="0" cy="8" r="88" fill={PC.peleEscura} />
      <path d="M -92 -2 Q -96 -100 0 -98 Q 96 -100 92 -2 Q 70 -60 0 -62 Q -70 -60 -92 -2 Z" fill={PC.cabeloMae} />
      {/* olhos */}
      {[-30, 30].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="4" rx="21" ry="25" fill="#fff" stroke={PC.tinta} strokeWidth="4" />
          <circle cx={x} cy="8" r="13" fill={PC.tinta} />
          <circle cx={x + 4} cy="3" r="4" fill="#fff" />
        </g>
      ))}
      <path d={nervosa ? "M -58 -26 L -8 -14" : "M -58 -22 Q -34 -34 -8 -22"} stroke="#2b1b14" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d={nervosa ? "M 58 -26 L 8 -14" : "M 58 -22 Q 34 -34 8 -22"} stroke="#2b1b14" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M -10 36 Q 0 44 10 36" fill="none" stroke="#b98254" strokeWidth="5" strokeLinecap="round" />
      {/* boca grande (voz alta) */}
      <ellipse cx="0" cy="66" rx={30 + abre * 8} ry={8 + abre * 24} fill="#7a2e3a" />
      <ellipse cx="0" cy={66 + abre * 12} rx={18} ry={Math.max(2, abre * 10)} fill="#e8667a" />
    </g>
  );
};

// O Remetente: nunca aparece de rosto. Silhueta de capuz atrás da persiana.
export const Sombra = ({ opacidade = 1 }) => (
  <g opacity={opacidade} transform="translate(180 244) scale(0.95)">
    <path d="M -150 260 Q -150 120 -70 96 L 70 96 Q 150 120 150 260 Z" fill="#05060f" />
    <path d="M -64 100 Q -86 -20 0 -34 Q 86 -20 64 100 Q 0 60 -64 100 Z" fill="#05060f" />
    <ellipse cx="0" cy="40" rx="34" ry="44" fill="#000" />
  </g>
);
