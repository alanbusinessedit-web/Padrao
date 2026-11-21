#!/usr/bin/env bash
# Monta a narração final de "O PIX do Caio" em public/narracao-pix-do-caio/<cena>.mp3:
#  - narrador (Gabriel) acelerado 1.25x, a partir de original/ e partes/;
#  - mãe (Isabela) 1.1x entra 1.2 s depois do narrador, na cena "mae";
#  - Remetente (Rannox Elion, grave) entra 2.9 s depois do início, na cena "twist".
set -euo pipefail
cd "$(dirname "$0")/../public/narracao-pix-do-caio"
for c in gancho mensagem olhar voto; do
  ffmpeg -v error -y -i original/$c.mp3 -filter:a "atempo=1.25" -b:a 128k $c.mp3
done
mistura() { # cena narrador voz atraso_ms tempo_voz
  ffmpeg -v error -y -i "partes/$2.mp3" -i "partes/$3.mp3" -filter_complex \
    "[0]atempo=1.25[n];[1]atempo=$5,adelay=$4|$4[v];[n][v]amix=inputs=2:normalize=0:duration=longest" -b:a 128k "$1.mp3"
}
mistura mae mae-narrador mae-voz 1200 1.1
mistura twist twist-narrador twist-remetente 2900 1.0
