# Canvas — Documentação (Missão do Grupo)

Este repositório contém uma pequena apresentação e uma demonstração prática do elemento `canvas` do HTML5.

**1. Conceito**
- O `canvas` é um elemento HTML que expõe uma API de desenho raster 2D (e através de WebGL, 3D).
- Uso típico: gráficos, visualizações, animações, jogos e edição de imagens no navegador.

**2. Onde está sendo utilizado esta tecnologia?**
- Aplicações web interativas (dashboards, gráficos em tempo real).
- Jogos 2D no navegador.
- Visualização científica e artística (simulações, data viz).
- Edições e manipuladores de imagens online.

**3. Demonstração prática**
Arquivos relevantes:
- Apresentação (slides): [presentation/index.html](presentation/index.html)
- Demo interativa: [presentation/demo.html](presentation/demo.html)

Como executar localmente:

1. Abra o diretório do projeto no VS Code.
2. Abra o arquivo [presentation/index.html](presentation/index.html) no navegador. Para recarregar automaticamente, instale a extensão Live Server e clique em "Go Live".

Comandos (exemplo com Live Server):

```bash
# Instale e ative a extensão Live Server no VS Code
# Em seguida, abra presentation/index.html e clique em 'Go Live'
```

O que a demo mostra:
- Uma bola simples que rebate nas bordas (animação com `requestAnimationFrame`).
- Ferramenta de desenho com o mouse (arraste para desenhar). Você pode limpar a tela usando o botão "Limpar desenho".

**4. Curiosidade**
- Canvas desenha diretamente em pixels; elementos desenhados não permanecem acessíveis como DOM. Para acessibilidade, combine canvas com descrições em texto e ARIA quando apropriado.
- Para projetos com muitos objetos interativos, bibliotecas como PixiJS ou frameworks de jogos aceleram o desenvolvimento e melhoram o desempenho.

---

Se quiser, eu gero slides em PDF exportáveis ou adiciono explicações por slide em `index.html`.