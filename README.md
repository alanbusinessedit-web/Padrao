# Padrao

Projeto de vídeo com [Remotion](https://www.remotion.dev/).

## Uso

```bash
npm install
npm run dev     # abre o Remotion Studio para visualizar
npm run render  # gera out/minha-cena.mp4
```

## Cenas

- `MinhaCena` (`src/MinhaCena.tsx`): fundo `#ff5e62` com o título
  "Eleições no Brasil", surgindo com fade-in no primeiro segundo
  (opacidade = `frame / 30`, a 30 fps).
