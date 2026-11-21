import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../config";

// Efeitos sonoros (public/sfx, gerados por scripts/gerar-sfx-pix.sh).
// `quando` = segundos dentro da cena. As cenas vêm do roteiro.json.
const EFEITOS = [
  { cena: "gancho", quando: 0.1, arquivo: "notificacao", volume: 0.7 },
  { cena: "mensagem", quando: 0.35, arquivo: "notificacao", volume: 0.7 },
  { cena: "mensagem", quando: 2.75, arquivo: "vibracao", volume: 0.6 },
  { cena: "mensagem", quando: 2.8, arquivo: "notificacao", volume: 0.7 },
  { cena: "mae", quando: 0, arquivo: "toque", volume: 0.55 },
  { cena: "twist", quando: 2.2, arquivo: "vibracao", volume: 0.7 },
  { cena: "twist", quando: 2.3, arquivo: "alerta", volume: 0.75 },
];

export const Efeitos = ({ cenas }) => (
  <>
    {EFEITOS.map((e, i) => {
      const cena = cenas.find((c) => c.id === e.cena);
      if (!cena) return null;
      return (
        <Sequence key={i} from={cena.from + Math.round(e.quando * FPS)} layout="none">
          <Audio src={staticFile(`sfx/${e.arquivo}.mp3`)} volume={e.volume} />
        </Sequence>
      );
    })}
  </>
);
