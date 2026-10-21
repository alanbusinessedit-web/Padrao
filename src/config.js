import roteiro from "./roteiro.json";

export const FPS = roteiro.fps;
export const LARGURA = roteiro.largura;
export const ALTURA = roteiro.altura;

// Tempos das cenas convertidos de segundos para frames.
// Cena 1: 0-150 | Cena 2: 150-330 | Cena 3: 330-540 | Cena 4: 540-720 | Cena 5: 720-900
export const prepararCenas = (r) =>
  r.cenas.map((cena) => ({
    ...cena,
    from: Math.round(cena.inicio * r.fps),
    duracao: Math.round((cena.fim - cena.inicio) * r.fps),
  }));

export const duracaoTotal = (cenas) => cenas[cenas.length - 1].from + cenas[cenas.length - 1].duracao;

export const CENAS = prepararCenas(roteiro);
export const DURACAO_TOTAL = duracaoTotal(CENAS);

// Duração da transição circular entre cenas (em frames).
export const TRANSICAO = 14;

// Paleta flat inspirada no Kurzgesagt.
export const CORES = {
  laranja1: "#ff5e62",
  laranja2: "#ff9966",
  roxo: "#2b2d42",
  roxoClaro: "#3d405b",
  azulNoite: "#1b2a4a",
  azulNoite2: "#25386b",
  teal: "#0f8b8d",
  tealEscuro: "#0b6e70",
  marinho: "#141b3c",
  marinho2: "#1f2a5c",
  amarelo: "#ffd166",
  verde: "#06d6a0",
  vermelho: "#ef476f",
  ciano: "#4cc9f0",
  rosa: "#f72585",
  branco: "#ffffff",
  creme: "#fdf0d5",
  cinzaUrna: "#e9ecef",
  cinzaUrna2: "#ced4da",
  grafite: "#495057",
};
