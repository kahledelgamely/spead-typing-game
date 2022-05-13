

const sentence =  `A large rose-tree stood near the entrance of the garden the roses growing on it were white but there were three gardeners at it busily painting them red Alice thought this a very curious thing and she went nearer to watch them and just as she came up to them she heard one of them say Look out now Five Don't go splashing paint over me like that I couldn't help it said Five in a sulky tone Seven jogged my elbow On which Seven looked up and said That's right Five Always lay the blame on others You'd better not talk said Five I heard the Queen say only yesterday you deserved to be beheaded What for said the one who had spoken first That's none of your business Two said Seven Yes it is his business said Five and I'll tell him it was for bringing the cook tulip-roots`;



const startGameButton = document.getElementById("button");
const highScore = document.getElementById("btn-highscore");
const input = document.getElementById("input");
const mainContent = document.getElementById("main-content");
const mainHeading = document.getElementById("main-heading");
const statContent = document.getElementById("stats");
const textDisplay = document.getElementById("text-display");
const wpmDisplay = document.getElementById("wpm-display");
const scoreDisplay = document.getElementById("score-display");
const timeDisplay = document.getElementById("time-display");
const form = document.getElementById("form");
const highscores = document.getElementById("highscores");
const splittedAlice = sentence.split(" ");

const state = {
    currentWord: "",
    score: 0,
    timeElapsed: 0,
    gameLength: 30, // 30 sec
};

/**
* Get a random word from Alice
*/
function getRandomWord() {
    return splittedAlice[
        Math.floor(Math.random() * splittedAlice.length)
    ];
}

function renderStats() {
    timeDisplay.textContent = state.gameLength - state.timeElapsed;
    scoreDisplay.textContent = state.score;
    wpmDisplay.textContent = calcWpm().toFixed(2);
}

function nextWord() {
    const word = getRandomWord();
    textDisplay.textContent = word;
    state.currentWord = word;
}

function calcWpm(){
    return Number(state.score / (state.timeElapsed / 60))
}

function createWordSpan(color, content) {
    const span = document.createElement("span");
    const style = "background-color: " + color;
    // add colour to it: defining the styles
    span.setAttribute("style", style);
    span.className = "typed-word";

    span.textContent = content;
    return span;
}




form.addEventListener("submit", function (event) {
    event.preventDefault();
    // get input value
    const userInput = input.value;

    // if no input dont do anything
    if (userInput === "") {
        return;
    }

    // check user entered the correct input
    const isCorrect = userInput === state.currentWord;

    // give it the appropriate color
    let span;
    if (isCorrect) {
        // if correct, add the word to the list with green background
        span = createWordSpan('rgb(23, 152, 70)', userInput);
        
        state.score += 1;
    } else {
        // if incorrect, add the word to the list with red background
        span = createWordSpan('red', userInput);
    }

    mainContent.appendChild(span);

    // finally we clear the text input
    input.value = "";

    // show next word and render stat
    nextWord();
    renderStats();
});

function startClock() {
    // add 1 sec per running sec
    setInterval(function () {
        state.timeElapsed += 1;
        renderStats();

        // end the game
        if (state.timeElapsed === state.gameLength) {
            alert("Game over. Your WPM is: " + wpmDisplay.textContent);
            const scores = JSON.parse(localStorage.getItem('highscores')) || [];

            scores.push(wpmDisplay.textContent)

            scores.sort();

            if(scores.length > 10){
                scores.shift();
            }

            localStorage.setItem('highscores', JSON.stringify(scores));
            // refresh the page
            window.location.reload();
        }
    }, 1000);
}

startGameButton.addEventListener("click", function (event) {
    // hide the start game button
    startGameButton.className = "hide";
    highScore.className = "hide";
    //hide the main heading
    mainHeading.className = "hide";
    // show the input field
    input.className = "";
    // show the stat
    statContent.className = "";

    // focus cursor on the text field so user can type right away
    input.focus();
    // show the word
    nextWord();

    startClock();
});



