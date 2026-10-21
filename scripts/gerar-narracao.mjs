// Gera a narração de cada cena com o ElevenLabs (TTS) em public/narracao/<cena>.mp3.
//
// Uso:
//   ELEVENLABS_API_KEY=xxx node scripts/gerar-narracao.mjs
//   ELEVENLABS_API_KEY=xxx ELEVENLABS_VOICE_ID=<id> node scripts/gerar-narracao.mjs
//
// Depois renderize com npm run render:narracao. Cada arquivo começa no
// início da sua cena e é cortado no fim dela, então o texto de cada cena precisa
// caber no tempo dela (o script avisa se passar).
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const roteiro = JSON.parse(readFileSync(join(raiz, "src/roteiro.json"), "utf8"));
const pasta = join(raiz, "public/narracao");

const chave = process.env.ELEVENLABS_API_KEY;
if (!chave) {
  console.error("Defina ELEVENLABS_API_KEY com a sua chave da API do ElevenLabs.");
  process.exit(1);
}
const voz = process.env.ELEVENLABS_VOICE_ID ?? "pNInz6obpgDQGcFmaJgB"; // troque por uma voz em português
const modelo = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";

mkdirSync(pasta, { recursive: true });

for (const cena of roteiro.cenas) {
  const resposta = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voz}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": chave, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text: cena.narracao,
        model_id: modelo,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    },
  );
  if (!resposta.ok) {
    console.error(`Erro em ${cena.id}: ${resposta.status} ${await resposta.text()}`);
    process.exit(1);
  }

  const arquivo = join(pasta, `${cena.id}.mp3`);
  writeFileSync(arquivo, Buffer.from(await resposta.arrayBuffer()));

  const limite = cena.fim - cena.inicio;
  const duracao = duracaoAudio(arquivo);
  const aviso = duracao !== null && duracao > limite ? `  ⚠ passa do tempo da cena (${limite}s): encurte o texto` : "";
  console.log(`${cena.id}: ${duracao === null ? "?" : duracao.toFixed(2)}s / ${limite}s${aviso}`);
}

// Mede a duração com o ffprobe que vem com o Remotion (npx remotion ffprobe).
function duracaoAudio(arquivo) {
  try {
    const saida = execFileSync(
      "npx",
      ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", arquivo],
      { cwd: raiz, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return parseFloat(saida.trim());
  } catch {
    return null;
  }
}
