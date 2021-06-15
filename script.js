const menuElement = document.getElementById('menu');
const gameElement = document.getElementById('game');
const gameCardsElement = document.getElementById('game-cards');
const startButtonElement = document.getElementById('start-button');
let isCardOpen = false;

function createCard(isBuggy) {
    const cardElement = document.createElement('div');
    const backCardElement = document.createElement('div');
    const frontCardElement = document.createElement('div');
    cardElement.classList.add('game__card');
    backCardElement.classList.add('game__card-back');
    frontCardElement.classList.add('game__card-front');

    if (isBuggy) {
        frontCardElement.classList.add('game__card-front_buggy');
    }

    cardElement.appendChild(frontCardElement);
    cardElement.appendChild(backCardElement);

    return cardElement;
}

function createCards(count) {
    const fragment = document.createDocumentFragment();
    const buggyCard = getBuggyCardNumber(count);

    for (let i = 0; i < count; i++) {
        const cardElement = createCard(i === buggyCard);

        cardElement.addEventListener('click', () => {
            cardElement.classList.add('rotate');
            if (isCardOpen) {
                finishGame();
            } else {
                isCardOpen = true;
            }
        });

        fragment.appendChild(cardElement);
    }

    return fragment;
}

function getBuggyCardNumber(count) {
    return Math.floor(Math.random() * Math.floor(count));
}

function renderEasyLevel() {
    gameCardsElement.classList.add('game__cards_thin');
    gameCardsElement.appendChild(createCards(3));
}

function renderMediumLevel() {
    gameCardsElement.classList.add('game__cards_thin');
    gameCardsElement.appendChild(createCards(6));
}

function renderHardLevel() {
    gameCardsElement.appendChild(createCards(10));
}

function startGame() {
    const levelRadioGroup = document.querySelector('.menu__item[name="level"]:checked');
    const level = levelRadioGroup.value;

    menuElement.classList.add('hidden');
    gameElement.classList.remove('hidden');

    switch (level) {
        case 'easy': 
            renderEasyLevel();
            break;
        case 'medium':
            renderMediumLevel();
            break;
        case 'hard':
            renderHardLevel();
            break;
    }
}

startButtonElement.addEventListener('click', startGame);

function finishGame() {
    gameElement.classList.add('hidden');
    menuElement.classList.remove('hidden');
    gameCardsElement.classList.remove('game__cards_thin');
    gameCardsElement.innerHTML = '';
    isCardOpen = false;
}
