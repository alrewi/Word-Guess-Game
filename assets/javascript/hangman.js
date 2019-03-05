  
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
//Create a variable to flag if the game has ended                
var hasFinished = false;            


//resetGame is a function that has several parts:
function resetGame() {  
    // 1. Chooses an number randomly from the number of artists in the artists' array and sets it equal to 
    // the variable currentWordIndex, which we'll use to generate the underscores in the game.
    currentWordIndex = Math.floor(Math.random() * (artists.length));
    // 2. Resets the number of remaining guesses to 15, the max number of incorrect guesses allowed, after 
    // each try.
    remainingGuesses = maxGuesses;
    // 3. Resets the array of guessed letters to an empty array, which is necessary for attempt #2 and on.
    guessedLetters = [];
    // 4. Resets the array of the letters in the current word to an empty array.
    currentWord = [];
    // 5. Counts the number of letters in the current word and pushes an underscore in to the current word 
    //array for each, providing our playing field.
    for (var i = 0; i < artists[currentWordIndex].length; i++) {
        currentWord.push("_");
    }
    // 6. Runs the updateDisplay function, described below.
    updateDisplay();
}

//update Display function also has several parts:
function updateDisplay() {
    //We need to write several things to the DOM, including: the number of wins, the number of remaining 
    //guesses and the letters that have been tried already. 
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    //Also, the underscores/letters comprising the current word we're guessing.
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("currentWord").innerText += currentWord[i];
    }
    //Here we have 3 elements that display at different points, acting as alerts to the user about where
    //they're at in the game: Press any key to start, you win and you lose.
    document.getElementById("youWin").style.display = 'none';
    document.getElementById("youLose").style.display = 'none';
    document.getElementById("pressKeyToStart").style.display = '';
    //We also include an if statement here to make sure we have guesses remaining. If we've used all our
    //tires already, the game must end here and we'll display the losing banner.
    if(remainingGuesses <= 0) {
        document.getElementById("youLose").style.display = '';
        hasFinished = true;
    }
}

//Now we're ready to play. We watch for a key down event in the DOM and create a function that first, checks
//to see if the game has already finished (hasFinished is set to true if you've already won or lost). If it's 
//over, we reset the game. If not, we take a closer look at the key stroke.
document.onkeydown = function(event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    //If the key pressed is a letter between a and z, we make it lower case and feed it to the makeGuess 
    //function. We also remove the banner informing a player to press a key to start a game.
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            document.getElementById("pressKeyToStart").style.display = "none";
        }
    }
}


//The makeGuess function checks in we still have guesses remaining. Then it checks whether the letter has 
//been guessed before. If it has, nothing happens. If it has not, it adds the letter to the array of guessed 
//letters and runs evaluateGuess. It also runs updateDisplay to make sure the remaining tries and the 
//previously guessed letters are updated on the screen. It also runs checkWin, described below.
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
}


//evaluateGuess creates an empty array called positions in order to log which positions a correctly guessed 
//letter occupies in the current word.  
function evaluateGuess(letter) {
    var positions = [];
    //First, we run through the length of the current word and check each letter against the user's guess.
    //For each time they match, the function pushes the letter in to the positions array.
    for (var i = 0; i < artists[currentWordIndex].length; i++) {
        if(artists[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    //If the guess was incorrect, the positions array will remain empty and the remaining number of tries 
    //goes down by 1. If the guess is correct, the function pushes the letter in to its corresponding spots 
    //in the current word.
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};


//The checkWin function looks at the word being guessed and determines whether there are any 
//underscores remaining. If not, we increase the number of wins by 1, flag hasFinished to true and display
//our winning banner.
function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        document.getElementById("youWin").style.display = "";
    }
};



 