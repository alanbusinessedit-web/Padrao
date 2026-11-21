import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../config";

// Efeitos sonoros (public/sfx, gerados por scripts/gerar-sfx-pix.sh): cada acontecimento
// tem o seu som. `quando` = segundos dentro da cena; `duracao` corta o som; `taxa` muda o tom.
const EFEITOS = [
  // gancho: o dinheiro entra
  { cena: "gancho", quando: 0.1, arquivo: "kaching", volume: 0.8 },
  // mensagem: aviso do banco, mensagem chegando, digitação
  { cena: "mensagem", quando: 0.35, arquivo: "pix", volume: 0.7 },
  { cena: "mensagem", quando: 2.8, arquivo: "notificacao", volume: 0.7 },
  { cena: "mensagem", quando: 2.85, arquivo: "mensagem", volume: 0.6 },
  { cena: "mensagem", quando: 3.7, arquivo: "digitacao", volume: 0.35, duracao: 2.1 },
  // mãe: toca, balão, conta de luz entra, carimbo
  { cena: "mae", quando: 0, arquivo: "toque", volume: 0.55 },
  { cena: "mae", quando: 1.2, arquivo: "pop", volume: 0.6 },
  { cena: "mae", quando: 2.1, arquivo: "whoosh", volume: 0.5 },
  { cena: "mae", quando: 3.0, arquivo: "carimbo", volume: 0.8 },
  // dilema: um pensamento de cada vez + relógio
  { cena: "olhar", quando: 0.05, arquivo: "pensamento", volume: 0.6 },
  { cena: "olhar", quando: 1.27, arquivo: "pensamento", volume: 0.6, taxa: 1.25 },
  { cena: "olhar", quando: 2.53, arquivo: "pensamento", volume: 0.6, taxa: 0.85 },
  { cena: "olhar", quando: 2.55, arquivo: "tictac", volume: 0.5, duracao: 2.4 },
  // twist: segunda mensagem, Caio tremendo, sombra na janela, digitação
  { cena: "twist", quando: 2.25, arquivo: "vibracao", volume: 0.7 },
  { cena: "twist", quando: 2.33, arquivo: "alerta", volume: 0.75 },
  { cena: "twist", quando: 2.45, arquivo: "tremedeira", volume: 0.7 },
  { cena: "twist", quando: 2.9, arquivo: "digitacao", volume: 0.2, duracao: 3.0 },
  { cena: "twist", quando: 4.1, arquivo: "sombra", volume: 0.7 },
  // voto: cartões entram, chamada para ação
  { cena: "voto", quando: 1.33, arquivo: "whoosh", volume: 0.45, taxa: 1.3 },
  { cena: "voto", quando: 3.33, arquivo: "whoosh", volume: 0.45, taxa: 1.3 },
  { cena: "voto", quando: 5.0, arquivo: "cta", volume: 0.7 },
  { cena: "voto", quando: 6.33, arquivo: "pop", volume: 0.6, taxa: 0.8 },
];

export const Efeitos = ({ cenas }) => {
  // transição circular entre cenas: um "whoosh" curto no início de cada cena (menos a primeira)
  const transicoes = cenas.slice(1).map((c) => ({ cena: c.id, quando: 0, arquivo: "transicao", volume: 0.3 }));
  return (
    <>
      {[...EFEITOS, ...transicoes].map((e, i) => {
        const cena = cenas.find((c) => c.id === e.cena);
        if (!cena) return null;
        return (
          <Sequence
            key={i}
            from={cena.from + Math.round(e.quando * FPS)}
            durationInFrames={e.duracao ? Math.round(e.duracao * FPS) : undefined}
            layout="none"
          >
            <Audio src={staticFile(`sfx/${e.arquivo}.mp3`)} volume={e.volume} playbackRate={e.taxa ?? 1} />
          </Sequence>
        );
      })}
    </>
  );
};
