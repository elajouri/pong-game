//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raio = diametroBolinha / 2;
//variaveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
//variaveis raquete
let widthRaquete = 7;
let heightRaquete = 90;
let xRaquete = 5;
let yRaquete = 155;
//variaveis velocidade raquete
let velocidadeYRaquete = 7;
//variaveis oponente
let xRaqueteOponente = 588;
let yRaqueteOponente = 155;
// velocidade raqueteoponente
let velocidadeRaqueteOponente;
//variaveis pontos
let pontosMeu = 0;
let pontosOponente = 0;
//variaveis sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;  
}

function verificaColisaoBolinha(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  } else if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
  yRaquete -= velocidadeYRaquete;
} else if (keyIsDown(DOWN_ARROW)){
  yRaquete += velocidadeYRaquete;
  }
}

function mostraRaquete(x, y){
    rect(x, y, widthRaquete, heightRaquete)
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + widthRaquete && yBolinha - raio < yRaquete + heightRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
  raquetada.play();
  }

}

function verificaColisaoRaqueteOponente(){
  if(xBolinha + raio > xRaqueteOponente && yBolinha - raio < yRaqueteOponente + heightRaquete && yBolinha + raio > yRaqueteOponente){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= velocidadeYRaquete;
  } else if (keyIsDown(83)){
    yRaqueteOponente += velocidadeYRaquete;
    }
}

function pontos(){
  if (xBolinha - raio <= 0){
    pontosOponente++;
    ponto.play();
  } else if (xBolinha + raio >= width){
    pontosMeu++;
    ponto.play();
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(pontosMeu, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  mostraBolinha();
  movimentaBolinha(); 
  verificaColisaoBolinha();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  verificaColisaoRaqueteOponente();
  movimentaRaqueteOponente();
  incluiPlacar();
  pontos();
}