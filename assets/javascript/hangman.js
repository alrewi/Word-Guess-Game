  
//Create an array to store our word options
var artists =          
    [
        "dolly",
        "loretta",
        "emmylou",
        "tammy",
        "patsy",
        "kitty",
        "wynonna",
        "tanya",
        "june",
        "lynn"
    ];
//Create a variable to store the index of the word from the artists' array
var currentWordIndex;
//Create an array to store the letters of the word being guessed           
var currentWord = [];       
//Create an array to store the letters that have been guessed already
var guessedLetters = [];  
//Create a variable to store the maximum number of wrong guesses allowed
const maxGuesses = 15;       
//Create a variable to store the number remaining guesses
var remainingGuesses = 0;
//Create a variable to store the number of wins
var wins = 0;   
//Create a variable         
var gameStarted = false;        
var hasFinished = false;            
//Run resetGame and updateDisplay functions to start 
resetGame();
updateDisplay();

function resetGame() {
    gameStarted = false;    
    
    currentWordIndex = Math.floor(Math.random() * (artists.length));
    
    remainingGuesses = maxGuesses;
    guessedLetters = [];
    currentWord = [];

    for (var i = 0; i < artists[currentWordIndex].length; i++) {
        currentWord.push("_");
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("currentWord").innerText += currentWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    document.getElementById("youWin").style.display = 'none';
    document.getElementById("youLose").style.display = 'none';
    document.getElementById("pressKeyToStart").style.display = '';
    if(remainingGuesses <= 0) {
        document.getElementById("youLose").style.display = '';
        hasFinished = true;
    }
}
    
document.onkeydown = function(event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            document.getElementById("pressKeyToStart").style.display = "none";
        }
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
}

function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < artists[currentWordIndex].length; i++) {
        if(artists[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        document.getElementById("youWin").style.display = "";
    }
};



 