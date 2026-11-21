#!/usr/bin/env bash
# Gera os efeitos sonoros de "O PIX do Caio" por síntese (ffmpeg), em public/sfx/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/sfx
sfx() { ffmpeg -v error -y -f lavfi -i "aevalsrc='$2':s=44100:d=$3" -b:a 128k "public/sfx/$1.mp3"; }
# notificação: dois tons ("ding-dong" agudo)
sfx notificacao "0.55*sin(2*PI*988*t)*exp(-7*t)+0.55*gte(t,0.13)*sin(2*PI*1319*(t-0.13))*exp(-5*(t-0.13))" 1.0
# vibração do celular: zumbido em dois pulsos
sfx vibracao "0.6*sin(2*PI*150*t)*(0.55+0.45*sin(2*PI*30*t))*(lt(t,0.2)+gte(t,0.3)*lt(t,0.5))" 0.55
# toque de ligação: dois toques longos
sfx toque "0.35*(sin(2*PI*440*t)+sin(2*PI*480*t))*(lt(t,0.4)+gte(t,0.55)*lt(t,0.95))" 1.0
# alerta do twist: tom grave descendente + batida
sfx alerta "0.55*(sin(2*PI*392*t)+0.5*sin(2*PI*784*t))*exp(-3*t)*lt(t,0.35)+0.55*gte(t,0.38)*(sin(2*PI*294*(t-0.38))+0.5*sin(2*PI*588*(t-0.38)))*exp(-2.5*(t-0.38))" 1.0
