const slides = [
  `<h1>Canvas (HTML5)</h1><p>Uma poderosa API para desenhar gráficos e animações em uma área rasterizada dentro da página.</p>`,
  `<h2>O que é</h2><p>Elemento <strong>&lt;canvas&gt;</strong> do HTML5 que fornece um contexto de desenho 2D (e WebGL para 3D).</p>`,
  `<h2>Como desenhar na tela</h2><ul><li>Obter o elemento <strong>&lt;canvas&gt;</strong></li><li>Pegar o contexto com <code>getContext('2d')</code></li><li>Usar métodos como <code>fillRect</code>, <code>arc</code>, <code>drawImage</code></li></ul>`,
  `<h2>Jogos e Animações</h2><ul><li>Frame loop com <code>requestAnimationFrame</code></li><li>Gerenciar estado e colisões</li><li>Desempenho: limpar + redesenhar incrementalmente</li></ul>`,
  `<h2>Diferença entre HTML e Canvas</h2><ul><li>HTML: elementos DOM acessíveis e sem rasterização</li><li>Canvas: pixels desenhados; não mantém semântica/DOM</li></ul>`,
  `<h2>Demonstração prática</h2><p>Veja o demo interativo abaixo (bouncing ball + desenho com mouse).</p><iframe src="demo.html" title="Demo Canvas"></iframe>`,
  `<h2>Conclusão</h2><p>Canvas é ideal para gráficos, jogos, visualizações e animações. Combine com DOM para acessibilidade.</p>`
];

let idx = 0;
const container = document.getElementById('slide');

function render() {
  container.innerHTML = slides[idx];
  window.scrollTo(0, 0);
}

render();

function next() {
  if (idx < slides.length - 1) {
    idx++;
    render();
  }
}

function prev() {
  if (idx > 0) {
    idx--;
    render();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    next();
  }
  if (e.key === 'ArrowLeft') {
    prev();
  }
});
