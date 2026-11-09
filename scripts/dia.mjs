// Atalhos da série "Dias da Semana".
//   node scripts/dia.mjs render <dia>             -> out/dias/dia-<dia>.mp4 (sem áudio)
//   node scripts/dia.mjs narracao <dia>           -> public/narracao-<dia>/*.mp3 (ElevenLabs)
//   node scripts/dia.mjs render-narracao <dia>    -> out/dias/dia-<dia>.mp4 com a narração por cena
// <dia>: segunda, terca, quarta, quinta, sexta, sabado ou domingo.
import { execFileSync } from "node:child_process";

const DIAS = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
const [acao, dia] = process.argv.slice(2);
if (!DIAS.includes(dia)) {
  console.error(`Use: node scripts/dia.mjs <render|narracao|render-narracao> <${DIAS.join("|")}>`);
  process.exit(1);
}
const id = `Dia${dia[0].toUpperCase()}${dia.slice(1)}`;
const saida = `out/dias/dia-${dia}.mp4`;
const rodar = (cmd, args) => execFileSync(cmd, args, { stdio: "inherit" });

if (acao === "render") rodar("npx", ["remotion", "render", id, saida]);
else if (acao === "render-narracao") rodar("npx", ["remotion", "render", id, saida, "--props=props/narracao-cenas.json"]);
else if (acao === "narracao") rodar("node", ["scripts/gerar-narracao.mjs", `src/dias-da-semana/roteiros/${dia}.json`, `narracao-${dia}`]);
else {
  console.error(`Ação desconhecida: ${acao}`);
  process.exit(1);
}
