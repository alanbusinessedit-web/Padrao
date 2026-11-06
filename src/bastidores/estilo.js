import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Estilo "bastidores": fundo marrom-escuro, títulos condensados com faixa laranja
// e painéis de interface com etiqueta em fonte mono.
// Fontes (SIL Open Font License) em public/fonts, para renderizar sem internet.
export const TITULO = "Anton";
export const MONO = "Space Mono";

loadFont({ family: TITULO, url: staticFile("fonts/Anton-400.woff2"), weight: "400" });
loadFont({ family: MONO, url: staticFile("fonts/SpaceMono-400.woff2"), weight: "400" });
loadFont({ family: MONO, url: staticFile("fonts/SpaceMono-700.woff2"), weight: "700" });

export const B = {
  fundo1: "#21170f",
  fundo2: "#0d0906",
  laranja: "#f2a93b",
  laranjaEscuro: "#c98a2e",
  borda: "#b97f2c",
  creme: "#f6ead2",
  sombraFaixa: "#e9d6b0",
  painel: "rgba(14, 10, 7, 0.72)",
  caixa: "#120d09",
  linha: "#3a2c1f",
  apagado: "#8a7a66",
  branco: "#f4efe7",
  vermelho: "#e5483b",
  verde: "#5fbf6a",
  azul: "#3d6fb6",
  azulNoite: "#1d2a4a",
};

// Texto sendo digitado: quantos caracteres aparecem no frame.
export const digitar = (texto, frame, inicio, porSegundo = 30, fps = 30) =>
  texto.slice(0, Math.max(0, Math.floor(((frame - inicio) / fps) * porSegundo)));
