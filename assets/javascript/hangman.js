// var audio = new Audio('audio_file.mp3');
// audio.play();

// underscores populate, # depends on random artist chosen
// user guesses a letter--
//     if not a letter, error Message  
//     if capitilized, make lower case
//     if correct letter appears in place of underscore 
//     if incorrect letter appears in graveyard
//     if already guessed that letter nothing happens or error
// number of tries decreases by 1 each (valid) letter guessed
// if word guessed correctly in fewer than 10 tries, user wins
//     number of wins increases by 1
//     image of artist appears
//     song plays
//     new game begins

var artists =          
    [
        "kacey musgraves",
        "margo price",
        "nikki lane"
    ];

const maxTries = 10;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var gameStarted = false;        
var hasFinished = false;            
var wins = 0;                   

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;    
    
    currentWordIndex = Math.floor(Math.random() * (artists.length));
    
    guessesLetters = [];
    guessingWord = [];

    for (var i = 0; i < artists[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFininshed = true;
    }


}
    
document.onkeydown = function(event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
}

function makeGuess(letter) {
    if (remainigGuesses > 0) {
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
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};

    

 