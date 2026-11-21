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

# --- um som para cada acontecimento ---
rnd="(random(0)*2-1)"
# dinheiro entrando (PIX chegou): moeda / caixa registradora
sfx kaching "0.35*(sin(2*PI*2093*t)+0.6*sin(2*PI*3136*t)+0.3*sin(2*PI*4699*t))*exp(-8*t)+0.35*gte(t,0.11)*(sin(2*PI*2637*(t-0.11))+0.6*sin(2*PI*3951*(t-0.11)))*exp(-6*(t-0.11))+0.25*$rnd*exp(-90*t)" 0.9
# app do banco avisando o Pix: três notas subindo
sfx pix "0.4*sin(2*PI*784*t)*exp(-9*t)+0.4*gte(t,0.1)*sin(2*PI*1047*(t-0.1))*exp(-9*(t-0.1))+0.45*gte(t,0.2)*sin(2*PI*1568*(t-0.2))*exp(-6*(t-0.2))" 0.9
# balão de mensagem aparecendo e balão de fala (pops graves/agudos)
sfx mensagem "0.7*sin(2*PI*(260+700*exp(-35*t))*t)*exp(-16*t)" 0.3
sfx pop "0.6*sin(2*PI*(480+1100*exp(-45*t))*t)*exp(-20*t)" 0.25
# teclas digitando
sfx digitacao "0.55*$rnd*exp(-400*mod(t,0.085))*(0.6+0.4*sin(2*PI*1.7*t))+0.3*$rnd*exp(-400*mod(t+0.031,0.11))" 3.0
# carimbo "VENCE HOJE": batida grave
sfx carimbo "0.7*sin(2*PI*85*t)*exp(-14*t)+0.4*$rnd*exp(-70*t)" 0.45
# pensamento (balão do dilema)
sfx pensamento "0.55*sin(2*PI*(380+520*(1-exp(-18*t)))*t)*exp(-9*t)" 0.4
# relógio: tic e tac
sfx tictac "0.7*$rnd*exp(-120*mod(t,0.5))*lt(mod(t,1),0.5)+0.5*sin(2*PI*1500*t)*exp(-90*mod(t,0.5))*gte(mod(t,1),0.5)" 3.0
# Caio tremendo de medo: tremor grave + dentes batendo
sfx tremedeira "0.9*$rnd*exp(-200*mod(t,0.06))*(0.65+0.35*sin(2*PI*5*t))*min(1,t*10)*exp(-0.5*t)+0.35*sin(2*PI*95*t)*(0.5+0.5*sin(2*PI*17*t))*min(1,t*10)*exp(-0.5*t)" 2.2
# sombra aparecendo na janela: drone sombrio
sfx sombra "0.55*(sin(2*PI*55*t)+0.7*sin(2*PI*58.5*t)+0.3*sin(2*PI*110*t))*(1-exp(-5*t))*exp(-1.1*t)" 2.4
# chamada para ação (A ou B)
sfx cta "0.4*sin(2*PI*880*t)*exp(-8*t)+0.4*gte(t,0.09)*sin(2*PI*1319*(t-0.09))*exp(-7*(t-0.09))+0.4*gte(t,0.18)*(sin(2*PI*1760*(t-0.18))+0.4*sin(2*PI*3520*(t-0.18)))*exp(-5*(t-0.18))" 1.0
# deslizes (conta de luz, cartões A/B) e transição entre cenas
ffmpeg -v error -y -f lavfi -i "anoisesrc=d=0.7:c=pink:r=44100:a=0.8" -af "highpass=f=250,lowpass=f=3500,afade=t=in:d=0.3,afade=t=out:st=0.3:d=0.4,volume=2.8" -b:a 128k public/sfx/whoosh.mp3
ffmpeg -v error -y -f lavfi -i "anoisesrc=d=0.45:c=white:r=44100:a=0.6" -af "highpass=f=700,lowpass=f=6500,afade=t=in:d=0.2,afade=t=out:st=0.2:d=0.25" -b:a 128k public/sfx/transicao.mp3

# --- cenas "ontem x hoje" e "tentativa" ---
# discagem (tons DTMF de um número), toque de chamada, bip da caixa postal
dtmf=""; fs=(697 770 852 941 770 852 697 941); gs=(1209 1336 1477 1336 1209 1477 1336 1209)
for k in 0 1 2 3 4 5 6 7; do dtmf+="+0.25*gte(t,$(echo "0.12*$k" | bc -l))*lt(t,$(echo "0.12*$k+0.09" | bc -l))*(sin(2*PI*${fs[$k]}*t)+sin(2*PI*${gs[$k]}*t))"; done
sfx discagem "${dtmf#+}" 1.05
sfx chamando "0.4*(sin(2*PI*425*t))*(lt(mod(t,1.6),0.9))" 1.3
sfx beep "0.5*sin(2*PI*1000*t)*lt(t,0.28)" 0.35
# toque no botão e erro do app
sfx clique "0.8*sin(2*PI*1300*t)*exp(-90*t)+0.4*$rnd*exp(-200*t)" 0.15
sfx erro "0.5*(sin(2*PI*180*t)+0.5*sin(2*PI*360*t)+0.3*sin(2*PI*540*t))*(lt(t,0.18)+gte(t,0.28)*lt(t,0.46))" 0.55
# cadeado fechando (Pix travado por 7 dias)
sfx cadeado "0.8*sin(2*PI*140*t)*exp(-25*t)+0.5*$rnd*exp(-120*t)+0.5*gte(t,0.13)*sin(2*PI*2200*(t-0.13))*exp(-70*(t-0.13))" 0.5
# "ontem" (trombone triste), contagem do saldo subindo, fanfarra da coroa
sfx triste "0.35*(sin(2*PI*233*t)+0.5*sin(2*PI*466*t))*lt(t,0.4)*(1-0.3*sin(2*PI*5*t))+0.35*gte(t,0.42)*(sin(2*PI*220*(t-0.42))+0.5*sin(2*PI*440*(t-0.42)))*lt(t,0.82)+0.35*gte(t,0.84)*(sin(2*PI*(207-35*(t-0.84))*(t-0.84))+0.5*sin(2*PI*2*(207-35*(t-0.84))*(t-0.84)))*exp(-1.2*(t-0.84))" 1.8
sfx contagem "0.45*$rnd*exp(-300*mod(t,0.07-0.04*t/1.3))+0.2*sin(2*PI*(600+500*t)*t)*exp(-60*mod(t,0.07-0.04*t/1.3))" 1.4
sfx fanfarra "0.22*(sin(2*PI*523*t)+sin(2*PI*659*t)+sin(2*PI*784*t))*exp(-3*t)*min(1,t*80)+0.28*gte(t,0.18)*(sin(2*PI*659*(t-0.18))+sin(2*PI*784*(t-0.18))+sin(2*PI*1047*(t-0.18))+0.5*sin(2*PI*2093*(t-0.18)))*exp(-2.5*(t-0.18))" 1.3
