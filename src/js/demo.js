// Seleciona o elemento <canvas> na página pelo id 'c'
const canvas = document.getElementById('c');
// Obtém o contexto 2D usado para desenhar no canvas
const ctx = canvas.getContext('2d');

// -------------------------
// Configuração da bolinha
// -------------------------
// `ball` guarda estado da bola: posição (x,y), raio (r), velocidade (vx, vy) e cor
const ball = { x: 100, y: 100, r: 20, vx: 3.2, vy: 2.5, color: '#ffd166' };

/**
 * updateBall()
 * Atualiza a posição da bola com base na velocidade e aplica
 * inversão de velocidade quando colide com as bordas do canvas.
 */
function updateBall() {
  // move a bola
  ball.x += ball.vx;
  ball.y += ball.vy;

  // se atingiu as bordas horizontais, inverte vx (rebote)
  if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) ball.vx *= -1;

  // se atingiu as bordas verticais, inverte vy (rebote)
  if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;
}

/**
 * drawBall()
 * Desenha a bola no canvas usando o estado atual em `ball`.
 */
function drawBall() {
  ctx.beginPath(); // inicia um novo caminho de desenho
  ctx.fillStyle = ball.color; // define a cor de preenchimento
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); // círculo (x,y,raio)
  ctx.fill(); // preenche o círculo desenhado
}

// -------------------------
// Desenho com o mouse
// -------------------------
// Variável que indica se o usuário está arrastando o mouse (desenhando)
let drawing = false;
// Cor atual do traço (valor inicial vindo do input de cor na página)
let drawColor = document.getElementById('color').value;

/*
  Eventos do canvas para permitir desenhar com o mouse:
  - mousedown: o usuário inicia um traço
  - mousemove: enquanto estiver desenhando, traça linhas até a posição do mouse
  - mouseup / mouseleave: termina o traço
*/
canvas.addEventListener('mousedown', (e) => {
  drawing = true; // começamos a desenhar
  ctx.beginPath(); // inicia um novo caminho para o traço do usuário
  ctx.moveTo(e.offsetX, e.offsetY); // posiciona o ponteiro inicial no local clicado
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    // adiciona um segmento ao caminho até a posição atual do mouse
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = drawColor; // usa a cor selecionada
    ctx.lineWidth = 3; // espessura do traço
    ctx.stroke(); // desenha o segmento no canvas
  }
});

// Ao soltar o botão do mouse paramos de desenhar
canvas.addEventListener('mouseup', () => {
  drawing = false;
});

// Se o mouse sair do canvas, também finalizamos o traço
canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

/**
 * Atualiza a cor do traço quando o usuário muda o input de cor.
 */
document.getElementById('color').addEventListener('change', (e) => {
  drawColor = e.target.value;
});

/**
 * Botão 'Limpar' — apaga todo o conteúdo do canvas
 * clearRect(0,0,width,height) limpa os pixels na área especificada.
 */
document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// -------------------------
// Controle da animação
// -------------------------
// `running` controla se a animação da bola está ativa
let running = true;

// Botão para pausar/retomar a animação
document.getElementById('toggleAnim').addEventListener('click', () => {
  running = !running; // alterna estado
  // atualiza o texto do botão para indicar a ação atual
  document.getElementById('toggleAnim').textContent = running ? 'Pausar' : 'Retomar';
  // se voltamos a rodar, reiniciamos o loop (requestAnimationFrame)
  if (running) loop();
});

// -------------------------
// Loop principal da demo
// -------------------------
/**
 * loop()
 * Função executada a cada frame quando `running` é true.
 * Ela preserva os desenhos feitos pelo usuário e redesenha a bola animada.
 */
function loop() {
  if (!running) return; // se estiver pausado, sai imediatamente

  /*
    Estratégia para preservar desenhos do usuário:
    - capturamos a imagem atual com getImageData (todos os pixels)
    - limpamos o canvas
    - restauramos os pixels do desenho do usuário
    - desenhamos a bola por cima
    Isso evita que o loop sobrescreva o que o usuário desenhou.
  */
  const drawingImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(drawingImage, 0, 0);

  // atualiza posição e desenha a bola
  updateBall();
  drawBall();

  // agenda próxima iteração de animação
  requestAnimationFrame(loop);
}

// Inicia a animação ao carregar o script
loop();
