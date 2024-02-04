const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let gameCompleted = false;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;

                    if (document.querySelectorAll('.card.active').length === totalCards) {
                        gameCompleted = true;
                        document.querySelector('#restartButton').style.display = 'block';
                    }
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

function restartGame() {
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    gameCompleted = false;

    document.querySelector('#game').innerHTML = '';
    cards = [];

    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        randomValue();
        cards[i].querySelector('.face').innerHTML = getFaceValue(valuesUsed[i]);
    }

    cards.forEach(card => {
        card.addEventListener('click', activate);
    });

    document.querySelector('#restartButton').style.display = 'none';
}

if (gameCompleted) {
    document.querySelector('#restartButton').style.display = 'block';
}

document.querySelector('#restartButton').style.display = 'none';
document.querySelector('#stats').innerHTML = '0 intentos';
document.querySelector('#restartButton').addEventListener('click', restartGame);

restartGame();