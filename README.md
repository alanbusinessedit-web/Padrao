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

Vídeo vertical de 1:28 (88 s), 1080×1920, 30 fps. Roteiro em
`src/fascismo-comunismo/roteiro.json`.

| Cena | Tempo | Conteúdo |
| --- | --- | --- |
| Gancho | 0–7,8 s | Duas pessoas discutindo ("FASCISTA!", "COMUNISTA!") → "VOCÊ SABE DIFERENCIAR?" |
| Origens | 7,8–18,4 s | Karl Marx (1848) x Benito Mussolini (1919) |
| Ideia central | 18,4–31,8 s | Luta de classes x a nação acima de tudo |
| Economia | 31,8–42,3 s | Fim da propriedade privada dos meios de produção x empresas privadas sob o Estado |
| Visão de mundo | 42,3–54,4 s | Internacionalista x ultranacionalista |
| Em comum | 54,4–67,8 s | Partido único, censura, culto ao líder, perseguição (URSS de Stálin, Itália de Mussolini) |
| Resumo | 67,8–79,5 s | Tabela comparativa e espectro (extrema esquerda x extrema direita) |
| Final | 79,5–88 s | "AGORA VOCÊ SABE DIFERENCIAR" + "SIGA PARA MAIS" |

```bash
npm run render:fc                       # gera fascismo-comunismo.mp4 (sem áudio)
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... npm run narracao:fc
npm run render:fc:narracao              # com a narração por cena
npm run render:fc:audio                 # com public/audio-fascismo-comunismo.mp3
```

## "Suspeição x Impedimento" (`SuspeicaoImpedimento`)

Primeiro vídeo do Narrando o Direito. Vertical, 2:09, 1080×1920, 30 fps, cobrindo
processo civil (CPC, arts. 144–146 e 966) e penal (CPP, arts. 96, 252, 254 e 256).
Roteiro em `src/suspeicao-impedimento/roteiro.json`; termina com a logo animada.

```bash
npm run render:si                       # gera suspeicao-impedimento.mp4 (sem áudio)
npm run render:si:audio                 # com public/audio-suspeicao-impedimento.mp3
npm run narracao:si && npm run render:si:narracao   # ElevenLabs por cena
```

## "O PIX do Caio" — Episódio 1 (`PixDoCaio`)

Série interativa de "você decide": Caio, 23 anos, estagiário, recebe um PIX de
R$ 12.847,32 de um número desconhecido com a mensagem "NÃO GASTA. EM 7 DIAS EU BUSCO."
Vertical, 1:01 (61 s), 1080×1920, 30 fps, cartoon 2D. Roteiro em
`src/pix-do-caio/roteiro.json` (tempos, narração e o `hud` de cada cena).

Regras da série implementadas no código:

- o contador `DIAS | SALDO | SUSPEITA` aparece em **todas** as cenas (`Contador` em `Elementos.jsx`;
  os valores vêm do `hud` da cena, então o Ep. 2 só muda esses números);
- termina com as duas opções grandes + "COMENTA A OU B. A MAIORIA DECIDE O DIA 6";
- twist nos últimos 15 s antes do voto (nova notificação do mesmo número + sombra na janela).

| Cena | Tempo | Conteúdo |
| --- | --- | --- |
| Gancho | 0–6 s | Caio de boca aberta, "PIX RECEBIDO R$ 12.847,32" contando, notas caindo |
| Mensagem | 6–15 s | Celular: extrato do PIX + "NÃO GASTA. EM 7 DIAS EU BUSCO." digitando |
| Mãe | 15–28 s | A mãe liga (voz alta), conta de luz R$ 187,00 "VENCE HOJE" |
| Dilema | 28–36 s | Caio olha o saldo, a mensagem e o relógio |
| Twist | 36–47 s | "Eu sei que você viu…", contador treme em vermelho, sombra de capuz na persiana |
| Voto | 47–61 s | A) PAGA A CONTA DE LUZ  ×  B) NÃO MEXE NO DINHEIRO |

```bash
npm run render:pix                      # gera pix-do-caio-ep1.mp4 (sem áudio, com legendas)
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... npm run narracao:pix
npm run render:pix:narracao             # com a narração por cena
npm run render:pix:audio                # com public/audio-pix-do-caio.mp3
```

Personagens (Caio, a Mãe e a sombra do Remetente) são SVG em `src/pix-do-caio/Personagens.jsx`.

## Marca "Narrando o Direito"

Logo em `src/marca/Logo.jsx` (símbolo: balão de fala + balança da justiça + ondas
de som). As imagens prontas ficam em `marca/`:

- `narrando-o-direito-quadrado.png` (1080×1080, foto de perfil; cabe no recorte redondo)
- `narrando-o-direito-horizontal.png` (1600×600, banner/abertura)
- versões `-transparente.png` de cada uma, para usar por cima de vídeos

Para gerar de novo depois de mudar o logo: `npm run logo`.

## `MinhaCena`

Exemplo simples de fade-in (1920×1080, 3 s): `npm run render:minha-cena`.
