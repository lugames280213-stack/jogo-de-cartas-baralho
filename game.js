// Constantes do Baralho
const suits = ['♥', '♦', '♣', '♠'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerHand = [];
let opponentHand = [];
let discardPile = [];

// --- Navegação de Telas ---
function startGame(mode) {
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    initGame();
}

function exitGame() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}

// --- Lógica do Pif ---
function initGame() {
    deck = createDeck();
    shuffle(deck);
    playerHand = [];
    opponentHand = [];
    discardPile = [];
    
    // Distribui 9 cartas para cada jogador (Regra do Pif)
    for (let i = 0; i < 9; i++) {
        playerHand.push(deck.pop());
        opponentHand.push(deck.pop());
    }
    
    // Vira a primeira carta para o lixo
    discardPile.push(deck.pop());
    
    renderGame();
}

function createDeck() {
    let newDeck = [];
    // Pif geralmente usa dois baralhos. Vamos criar 2 de cada.
    for(let d = 0; d < 2; d++) {
        for (let suit of suits) {
            for (let value of values) {
                newDeck.push({ suit, value, isRed: suit === '♥' || suit === '♦' });
            }
        }
    }
    return newDeck;
}

// Algoritmo de Fisher-Yates para embaralhamento aleatório perfeito
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- Ações de Jogo ---
function drawCard() {
    if (deck.length === 0) {
        alert("O monte acabou! Reembaralhando o lixo...");
        // Lógica de pegar o lixo, deixar o topo e reembaralhar iria aqui
        return;
    }
    playerHand.push(deck.pop());
    renderGame();
}

function discardCard(index) {
    // Adiciona a carta clicada ao lixo e remove da mão
    discardPile.push(playerHand[index]);
    playerHand.splice(index, 1);
    renderGame();
}

function organizeHand() {
    // Ordenação simples por naipe e valor
    playerHand.sort((a, b) => {
        if (a.suit === b.suit) return values.indexOf(a.value) - values.indexOf(b.value);
        return suits.indexOf(a.suit) - suits.indexOf(b.suit);
    });
    renderGame();
}

function checkBatida() {
    // A validação real de trincas e sequências é complexa.
    // Requer algoritmos de combinação (Backtracking/Combinações).
    if (playerHand.length === 9) {
        alert("Analisando mão... (Lógica de trincas e sequências a ser implementada na fase 2)");
    } else {
        alert("Você deve ter 9 cartas formando 3 jogos válidos para bater, e descartar a décima!");
    }
}

// --- Renderização Visual ---
function renderGame() {
    const playerHandDiv = document.getElementById('player-hand');
    const opponentHandDiv = document.getElementById('opponent-hand');
    const discardPileDiv = document.getElementById('discard-pile');
    
    // Renderiza mão do jogador
    playerHandDiv.innerHTML = '';
    playerHand.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${card.isRed ? 'red' : 'black'}`;
        cardEl.innerHTML = `${card.value} ${card.suit}`;
        // Ao clicar numa carta, descarta
        cardEl.onclick = () => discardCard(index);
        playerHandDiv.appendChild(cardEl);
    });

    // Renderiza mão do oponente (escondida)
    opponentHandDiv.innerHTML = '';
    opponentHand.forEach(() => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        opponentHandDiv.appendChild(cardEl);
    });

    // Renderiza o lixo
    if (discardPile.length > 0) {
        const topCard = discardPile[discardPile.length - 1];
        discardPileDiv.innerHTML = `<div class="card ${topCard.isRed ? 'red' : 'black'}">${topCard.value} ${topCard.suit}</div>`;
    } else {
        discardPileDiv.innerHTML = '<span>Lixo</span>';
    }
}
