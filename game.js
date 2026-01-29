/* Programa Principal */
const personagem = document.getElementById("personagem");
const imagemUsuario = document.getElementById("imagem-usuario");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");
const zonas = document.querySelectorAll(".topico");

/* Controle de posição */
let posicaoX = window.innerWidth / 2;
let posicaoY = window.innerHeight / 2;
const velocidade = 14;

/* Movimento através do teclado */
document.addEventListener("keydown", (evento) => {
    let movimentou = false;
    if (evento.key === "ArrowUp" || evento.key === "w") { posicaoY -= velocidade; movimentou = true; }
    if (evento.key === "ArrowDown" || evento.key === "s") { posicaoY += velocidade; movimentou = true; }
    if (evento.key === "ArrowLeft" || evento.key === "a") { posicaoX -= velocidade; imagemUsuario.style.transform = "scaleX(-1)"; movimentou = true; }
    if (evento.key === "ArrowRight" || evento.key === "d") { posicaoX += velocidade; imagemUsuario.style.transform = "scaleX(1)"; movimentou = true; }
    if (movimentou) atualizarPosicao();
});

/* Atualiza posição*/
function atualizarPosicao() {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    const larguraPersonagem = personagem.offsetWidth;
    const alturaPersonagem = personagem.offsetHeight;

    posicaoX = Math.max(0, Math.min(larguraTela - larguraPersonagem, posicaoX));
    posicaoY = Math.max(0, Math.min(alturaTela - alturaPersonagem, posicaoY));

    personagem.style.left = posicaoX + "px";
    personagem.style.top = posicaoY + "px";

    verificarColisoes();

  // verifica proximidade da aranha e mostra popup no centro da tela
    verificarProximidadeAranhaCentral(200);
}

/* Verifica as colizoes */
function verificarColisoes() {
    let popupAberto = false;
    popupAberto = verificarZona("zona-dados", conteudoDados()) || popupAberto;
    popupAberto = verificarZona("zona-formacao", conteudoFormacao()) || popupAberto;
    popupAberto = verificarZona("zona-experiencia", conteudoExperiencia()) || popupAberto;
    popupAberto = verificarZona("zona-redes", conteudoRedes()) || popupAberto;
    popupAberto = verificarZona("zona-carta", conteudoCarta()) || popupAberto;

    if (!popupAberto) {
        caixaInfo.style.display = "none";
        comemoracao.style.display = "none";
    }
}

/* Função colisão*/
function verificarZona(idZona, conteudoHTML) {
    const zona = document.getElementById(idZona);
    const areaZona = zona.getBoundingClientRect();
    const areaPersonagem = personagem.getBoundingClientRect();

    const colidiu =
    areaPersonagem.right > areaZona.left &&
    areaPersonagem.left < areaZona.right &&
    areaPersonagem.bottom > areaZona.top &&
    areaPersonagem.top < areaZona.bottom;

    if (colidiu) {
    caixaInfo.style.display = "block";
    conteudoInfo.innerHTML = conteudoHTML;

    // Posiciona a comemoração acima do popup
    const caixaRect = caixaInfo.getBoundingClientRect();
    comemoracao.style.left = (caixaRect.left + caixaRect.width - 40) + "px";
    comemoracao.style.top = (caixaRect.top - 40) + "px";
    comemoracao.style.display = "block";
    return true;
}
    return false;
}

/* Informações dos popups */
// Dados Pessoais
function conteudoDados() { return `
<h2>Dados Pessoais</h2>
<p><strong>Nacionalidade:</strong> Brasileira</p>
<p><strong>Data de nascimento:</strong> 25/10/2002</p>
<p><strong>Endereço:</strong> Zona Sul, São Paulo - SP, 04951-050</p>
<p><strong>Celular (WhatsApp):</strong> (11) 9 1422-2424</p>
<p><strong>E-mail:</strong> caueribeiroferreira@gmail.com</p>
<hr>
<h3>Objetivo Profissional</h3>
<p>Desenvolvedor de Software</p>
<p>Analista de Dados</p>
<p>Analista de Segurança da Informação / Cibernética</p>`;}

/* Formação Acadêmica */
function conteudoFormacao() { return `
<h2>Formação Acadêmica</h2>
<p><strong>Faculdade Uninter</strong></p>
<p>Tecnólogo em Análise e Desenvolvimento de Sistemas</p>
<p>07/2025 a 12/2027</p><br>
<p><strong>Ensino Médio:</strong> Completo</p>
<hr>
<h3>Conhecimentos Técnicos</h3>
<p><strong>Front End:</strong> HTML, CSS, JavaScript</p>
<p><strong>UI/UX:</strong> Figma, Canva</p>
<p><strong>Back End:</strong> Python, Java</p>
<p><strong>Ferramentas:</strong> Word, Power BI, Inteligência Artificial</p>
<p><strong>Excel Básico:</strong> Fundação Bradesco (2016)</p>`;}

/* Experiência Profissional */
function conteudoExperiencia() { return `
<h2>Experiência Profissional</h2>
<p><strong>Hairline Cabelos e Acessórios LTDA</strong></p>
<p>02/2024 – 05/2025</p>
<p>Venda de produtos, operação de caixa, organização de estoque, atendimento ao cliente, auxílio no marketing e operador de vendas E-commerce.</p>
<br>
<p><strong>Cocadinha Atacado e Varejo – Doceria</strong></p>
<p>03/2023 – 09/2023</p>
<p>Organização de estoque, recebimento e armazenamento de mercadorias, auxílio na operação de caixa, atendimento ao cliente e serviços gerais.</p>
<hr>
<h3>Habilidades</h3>
<p>Atitude positiva</p>
<p>Facilidade de comunicação</p>
<p>Ética, honestidade e integridade</p>
<p>Pontualidade, flexibilidade e adaptação</p>
<p>Inteligência emocional</p>
<p>Iniciativa e proatividade</p>
<p>Trabalho em equipe</p>
<p>Interessado em evoluir</p>
<p>Motivado a aprender coisas novas</p>
<p>Raciocínio lógico</p>`;}

/* Redes Sociais */
function conteudoRedes() { return `
<h2>Redes Sociais</h2>
<p><a href="https://github.com/Caue2002" target="_blank">GitHub: github.com/Caue2002</a></p>
<p><a href="https://www.linkedin.com/in/ribeiroferreiracaue" target="_blank">LinkedIn: linkedin.com/in/ribeiroferreiracaue</a></p>`;}

/* Carta de Apresentação */
function conteudoCarta() { return `
<h2>Carta de Apresentação</h2>
<p>Sou estudante de Análise e Desenvolvimento de Sistemas, com grande interesse em iniciar minha carreira na área de Tecnologia da Informação.</p>
<p>Possuo conhecimentos em HTML, CSS, JavaScript, Python e Java, além de familiaridade com ferramentas como Power BI, Figma e conceitos de UI/UX.</p>
<p>Busco uma oportunidade onde eu possa aplicar meus conhecimentos, aprender continuamente e contribuir com soluções eficientes na área de TI.</p>`;}

/* PopUP de Parabens */
const popupParabens = document.getElementById("popup-parabens");
const topicosVisitados = {
    "zona-dados": false,
    "zona-formacao": false,
    "zona-experiencia": false,
    "zona-redes": false,
    "zona-carta": false
};

/* função */
const verificarZonaOriginal = verificarZona;
verificarZona = function (idZona, conteudoHTML) {
    const resultado = verificarZonaOriginal(idZona, conteudoHTML);
        if (resultado) {
    topicosVisitados[idZona] = true;
    verificarPopupParabens();
}
    return resultado;
};

/* Exibe */
function verificarPopupParabens() {
    const todosVisitados = Object.values(topicosVisitados).every(valor => valor);
        if (todosVisitados && popupParabens.style.display !== "block") {
    popupParabens.style.display = "block";
    setTimeout(() => {
        popupParabens.style.display = "none";
    }, 5000);
}
}

/* MINI-MAPA */
(function () {
    const minimap = document.getElementById('minimap');
        if (!minimap) return;
    const ctx = minimap.getContext('2d');

    function ajustarParaDPR() {
        const dpr = window.devicePixelRatio || 1;
        const rect = minimap.getBoundingClientRect();
        const cssW = Math.max(1, rect.width);
        const cssH = Math.max(1, rect.height);
        minimap.width = Math.round(cssW * dpr);
        minimap.height = Math.round(cssH * dpr);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
}

    function desenharMinimap() {
        const rect = minimap.getBoundingClientRect();
        const mmW = rect.width;
        const mmH = rect.height;
        ctx.clearRect(0, 0, mmW, mmH);

        const worldW = window.innerWidth;
        const worldH = window.innerHeight;

    // topicos
    document.querySelectorAll('.topico').forEach((z) => {
        const r = z.getBoundingClientRect();
        const x = (r.left / worldW) * mmW;
        const y = (r.top / worldH) * mmH;
        const w = (r.width / worldW) * mmW;
        const h = (r.height / worldH) * mmH;
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
});

    // Personagem
    const pr = personagem.getBoundingClientRect();
    const px = ((pr.left + pr.width / 2) / worldW) * mmW;
    const py = ((pr.top + pr.height / 2) / worldH) * mmH;
        ctx.fillStyle = '#ff5252';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

    // Moldura
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, mmW - 1, mmH - 1);
}

function render() { desenharMinimap(); }

ajustarParaDPR();
render();

window.addEventListener('resize', () => { ajustarParaDPR(); render(); });

  // Hook 
    const atualizarPosicaoOriginal = atualizarPosicao;
        atualizarPosicao = function () {
        atualizarPosicaoOriginal();
        requestAnimationFrame(render);
    };
})();

/* BARRA DE PROGRESSO */
    (function () {
        const wrap = document.getElementById('progress-wrap');
        const percentEl = document.getElementById('progress-percent');
        const fillEl = document.getElementById('progress-fill');
            if (!wrap || !percentEl || !fillEl) return;

    const totalTopicos = () => Object.keys(topicosVisitados || {}).length || 0;

    function calcularVisitados() {
        if (!topicosVisitados) return 0;
        return Object.values(topicosVisitados).filter(Boolean).length;
    }

    function atualizarBarra() {
        const total = totalTopicos();
        const visitados = calcularVisitados();
        const perc = total > 0 ? Math.round((visitados / total) * 100) : 0;
        percentEl.textContent = perc + '%';
        fillEl.style.width = perc + '%';

    // Cor dinâmica
        const g = Math.min(255, Math.round((perc / 100) * 180 + 60));
        const r = Math.max(80, 240 - Math.round((perc / 100) * 160));
        fillEl.style.background = `linear-gradient(90deg, rgb(${r},${g-40},80), rgb(${Math.max(60,r-20)},${Math.min(255,g+20)},90))`;
        fillEl.style.boxShadow = `0 0 12px rgba(${Math.max(60,r-20)},${Math.min(255,g+20)},90,0.45)`;
}

    // Atualiza ao carregar
    atualizarBarra();

    // Envolve a função verificarZona (sem tocar na anterior)
    const verificarZonaAnterior = verificarZona;
    verificarZona = function (idZona, conteudoHTML) {
    const r = verificarZonaAnterior(idZona, conteudoHTML);
    if (r) atualizarBarra();
    return r;
};

    window.addEventListener('resize', atualizarBarra);
})();

/* EFEITOS NOS TÓPICOS*/
    (function () {
        const FX_ZINDEX = 7;
        let canvas, ctx, dpr;
        const topics = Array.from(document.querySelectorAll('.topico'));
            if (!topics.length) return;

    // Cria canvas
    canvas = document.createElement('canvas');
    canvas.id = 'topic-fx';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    function resize() {
        dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Define estilo CSS para cobrir a tela
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        // Define buffer interno em pixels físicos
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
}
    resize();

    window.addEventListener('resize', resize);

  // Partículas por tópico
    const clusters = topics.map((el) => ({
    el,
    // partículas "fumaça": posição relativa ao tópico
    puffs: Array.from({ length: 10 }, () => makePuff())
}));

    function makePuff() {
        return {
        x: Math.random(),
        y: 1 + Math.random() * 0.2,
        r: 8 + Math.random() * 14,
        vy: 10 + Math.random() * 18,
        a: 0.15 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 12
    };
}

    let last = performance.now();
    function tick(now) {
        const dt = Math.min(0.05, (now - last) / 1000); // segundos (cap 50ms)
        last = now;

    // Limpa cena
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Desenha por tópico
    clusters.forEach(({ el, puffs }) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    //Glow aditivo suave
    const glowRadius = Math.max(r.width, r.height) * 0.85;
    const grad = ctx.createRadialGradient(cx, cy, glowRadius * 0.1, cx, cy, glowRadius);
    const t = (now / 1000) % 2.4;
    const pulse = 0.6 + 0.4 * Math.sin(t * Math.PI); // 0.2..1.0
    grad.addColorStop(0, `rgba(255,255,255,${0.14 * pulse})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // ---- Fumacinha subindo ----
    puffs.forEach(p => {

    // posição absoluta
    p.y -= (p.vy * dt) / r.height; // normaliza pela altura do tópico
    const px = r.left + p.x * r.width + p.vx * (1 - p.y); // leve drift
    const py = r.top + p.y * r.height;

    // quando sai, recicla
    if (p.y <= -0.2) {
        const np = makePuff();
        np.y = 1 + Math.random() * 0.1;
        np.x = Math.random();
        p.x = np.x; p.y = np.y; p.r = np.r; p.vy = np.vy; p.a = np.a; p.vx = np.vx;
    }

    // desenha puff (círculo muito suave)
    const radGrad = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        radGrad.addColorStop(0, `rgba(255,255,255,${p.a})`);
        radGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
});

requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();

/*  POPUP personagem chega perto da aranha. */
const popupProtecao = document.getElementById("popup-protecao");
const imagemAranha = document.getElementById("aranha");

/** Retorna o centro */
function obterCentro(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/**
 * Verifica a proximidade entre o personagem e a aranha.
 * @param {number} limiarPx - distância em pixels para disparar o popup (padrão 200)
 */
function verificarProximidadeAranhaCentral(limiarPx = 200) {
    if (!popupProtecao || !imagemAranha || !personagem) return;

const cPers = obterCentro(personagem);
const cAra  = obterCentro(imagemAranha);

const dx = cPers.x - cAra.x;
const dy = cPers.y - cAra.y;
const distancia = Math.hypot(dx, dy);

    if (distancia <= limiarPx) {
    // exibe no centro da tela
    if (!popupProtecao.classList.contains("mostrar")) {
        popupProtecao.classList.add("mostrar");
    }
} else {
    popupProtecao.classList.remove("mostrar");
}
}

// Chamada inicial para garantir estado correto ao carregar
verificarProximidadeAranhaCentral(200);