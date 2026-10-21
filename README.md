# Padrao

Vídeos com [Remotion](https://www.remotion.dev/) (React).

## "Como Funciona o Voto no Brasil" (`VotoBrasil`)

Vídeo vertical de 30 s, 1080×1920, 30 fps, em estilo flat 2D (inspirado no Kurzgesagt).

| Cena | Tempo | Frames | Conteúdo |
| --- | --- | --- | --- |
| 1 | 0–5 s | 0–150 | Gradiente laranja, contador "100" + "MILHÕES DE VOTOS", multidão surgindo |
| 2 | 5–11 s | 150–330 | Fundo roxo, urna eletrônica + Wi-Fi bloqueado, "100% OFF-LINE" |
| 3 | 11–18 s | 330–540 | Relógio chega às 17:00, bits entram no cadeado, "DADOS CRIPTOGRAFADOS" |
| 4 | 18–24 s | 540–720 | Boletim de urna impresso deslizando da urna, "BOLETIM DE URNA" |
| 5 | 24–30 s | 720–900 | Mapa com conexões fluindo para Brasília, "TRANSPARÊNCIA TOTAL" |

Os tempos, títulos e textos da narração ficam em `src/roteiro.json`. O vídeo, as
legendas e o script de TTS leem esse arquivo; mude ali e tudo acompanha.

### Comandos

```bash
npm install
npm run dev               # Remotion Studio (pré-visualização no navegador)
npm run render            # gera output.mp4 (sem áudio)
```

Comando equivalente sem npm:

```bash
npx remotion render VotoBrasil output.mp4
```

### Narração

Há três modos, escolhidos pela prop `narracao`:

1. **ElevenLabs, um arquivo por cena (sincronização exata)**
   ```bash
   ELEVENLABS_API_KEY=sua_chave ELEVENLABS_VOICE_ID=id_da_voz npm run narracao
   npm run render:narracao
   ```
   O script gera `public/narracao/cena1.mp3` … `cena5.mp3` e avisa se alguma fala
   passar do tempo da cena. Cada arquivo começa exatamente no primeiro frame da
   sua cena e é cortado no último.

2. **Arquivo único**: coloque o áudio em `public/audio.mp3` (já editado com os
   tempos da tabela acima) e rode `npm run render:audio`.

3. **Sem áudio**: `npm run render` (padrão).

As legendas no rodapé destacam as palavras ao longo de cada cena. Para desligar,
use `"legendas": false` nos arquivos de `props/`.

### Estrutura

```
src/
  index.js              registerRoot
  Root.jsx              registra as composições
  Composition.jsx       VotoBrasil
  fascismo-comunismo/   FascismoComunismo: roteiro, cenas, painéis e ícones
  roteiro.json          tempos, títulos e narração
  config.js             fps, tamanho, frames das cenas, paleta de cores
  fonte.js              Montserrat local (public/fonts)
  cenas/                Cena1Votos … Cena5Transparencia
  components/           VideoCenas, Fundo, CaixaTexto, Legenda, Transicao, Narracao
scripts/gerar-narracao.mjs   TTS com ElevenLabs
props/                       props prontas para os modos de narração
```

## "Fascismo x Comunismo: você sabe diferenciar?" (`FascismoComunismo`)

Vídeo vertical de 1:25 (85 s), 1080×1920, 30 fps. Roteiro em
`src/fascismo-comunismo/roteiro.json`.

| Cena | Tempo | Conteúdo |
| --- | --- | --- |
| Gancho | 0–7 s | Duas pessoas discutindo ("FASCISTA!", "COMUNISTA!") → "VOCÊ SABE DIFERENCIAR?" |
| Origens | 7–17 s | Karl Marx (1848) x Benito Mussolini (1919) |
| Ideia central | 17–31 s | Luta de classes x a nação acima de tudo |
| Economia | 31–43 s | Fim da propriedade privada dos meios de produção x empresas privadas sob o Estado |
| Visão de mundo | 43–54 s | Internacionalista x ultranacionalista |
| Em comum | 54–67 s | Partido único, censura, culto ao líder, perseguição (URSS de Stálin, Itália de Mussolini) |
| Resumo | 67–78 s | Tabela comparativa e espectro (extrema esquerda x extrema direita) |
| Final | 78–85 s | "AGORA VOCÊ SABE DIFERENCIAR" + "SIGA PARA MAIS" |

```bash
npm run render:fc                       # gera fascismo-comunismo.mp4 (sem áudio)
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... npm run narracao:fc
npm run render:fc:narracao              # com a narração por cena
npm run render:fc:audio                 # com public/audio-fascismo-comunismo.mp3
```

## `MinhaCena`

Exemplo simples de fade-in (1920×1080, 3 s): `npm run render:minha-cena`.
