document.addEventListener('DOMContentLoaded', () => {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const score = document.querySelector('.score');
    const state = document.querySelector('.state');
    const alphabetContainer = document.querySelector('.alphabet-container');
    const answerContainer = document.querySelector('.answer-container');
    const clue = document.querySelector('.clue');
    let lives = 10;
    let key;

    function startGame() {
        createAlphabetButtons();
        selectRandomWord();
        setUpAnswerContainers();
    }

    function createAlphabetButtons() {
        alphabet.forEach((letter) => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.classList.add('alphabet-button');
            button.addEventListener('click', () => handleLetterClicked(letter));
            alphabetContainer.appendChild(button);
        });
    }

    function selectRandomWord() {
        const wordLists = {
            city: ['tehran', 'newyork', 'istanbul', 'rome', 'losangeles'],
            food: ['pizza', 'burger', 'pasta'],
            games: ['gta', 'thelastofus', 'uncharted'],
        };
        const random = Math.random();
        let category, keys;
        if (random <= 1/3) {
            category = 'city';
        } else if (random <= 2/3) {
            category = 'food';
        } else {
            category = 'games';
        }

        keys = wordLists[category];
        key = keys[Math.floor(Math.random() * keys.length)].toUpperCase();

        switch(category) {
            case 'city':
                clue.innerHTML = 'City';
                break;
            case 'food':
                clue.innerHTML = 'Food';
                break;
            case 'games':
                clue.innerHTML = 'Games';
                break;
            default:
                break;
        }   
    }

    function setUpAnswerContainers() {
        for(let i = 0; i < key.length; i++) {
            const answerBox = document.createElement('p');
            answerBox.classList.add('answering');
            answerContainer.appendChild(answerBox);
        }
    }

    const correctLetters = [];
    let gameWon = false;
    let gameLost = false;

    function handleLetterClicked(clickedLetter) {
        if (gameLost || gameWon) {
            return;
        }

        let foundLetter = false;

        for (let i = 0; i < key.length; i++) {
            if (key[i] === clickedLetter) {
                correctLetters[i] = clickedLetter;
                document.querySelectorAll('.answering')[i].textContent = clickedLetter;
                foundLetter = true;
            }
        }

        if (!foundLetter) {
            lives--;
            score.innerHTML = lives;
            if (lives < 0) {
                lives = 0;
                score.innerHTML = lives;
                handleGameLost();
            }
        }

        if (correctLetters.join('') === key) {
            handleGameWon();
        }
    }

    function handleGameWon() {
        state.innerHTML = "You win!";
        gameWon = true;
    }

    function handleGameLost() {
        state.innerHTML = "You lost!";
        gameLost = true;
    }

    startGame();
});