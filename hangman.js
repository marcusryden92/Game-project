//gameText("HANGMAN");

//We ask the user to input a word, and keep asking until
//we're sure it's a word.

let userInputWord;

while (true) {

  userInputWord = prompt("Please enter a word!");

  if (/^[a-zA-Z]+$/.test(userInputWord)) {
    break;
  } else {
    gameText("Only letters please!");
  }
}

let windPlaying = false;

document.getElementById('playWindButton').addEventListener('click', function () {

  let windSound = document.getElementById('wind');

  if (!windPlaying) {
    windSound.play();
  } else {
    windSound.pause();
  }

  windPlaying = !windPlaying;
});

let wordArray = [];
let wordLength = userInputWord.length;

//Assign the input word to an array:

for (let i = 0; i < wordLength; i++) {
  wordArray.push(userInputWord[i]);
}

//Create a display array with underscores that can be used in the game,
//which is as long as the input word:

let displayArray = [];

for (let i = 0; i < wordLength; i++) {
  displayArray.push("_");
}

let displayString = displayArray.join(" ");
arrayText(displayString);

//How many guesses are allowed?

let guessesAllowed = 7;
gameText(`You have ${guessesAllowed} guesses!`);

let failedGuesses = 0;
let correctGuesses = 0;

//The main game loop. This loop runs as long as the number of wrong
//guesses is lower than the number of allowed guesses:

let formEl = document.querySelector("#guessForm");
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  //Prompting the player to guess a letter:

  let guessEl = document.querySelector("#guess");
  let guessedLetter = guessEl.value;

  //We have to make sure that the letter hasn't already been guessed,
  //otherwise we can keep guessing the same (correct) letter and still win.


  let originalLetter = true;

  //We're checking the guessed letter against the displayArray,
  //in order to make sure it hasn't already been logged in the correct answer.

  for (let i = 0; i < wordLength; i++) {
    if (compareLetters(guessedLetter, displayArray[i])) {
      originalLetter = false;
    }
  }

  if (!originalLetter) {
    gameText("You have already guessed that letter!");
    guessEl.value = "";
    return;
  }

  //We initialize a boolean value to check if a particular guess is right or wrong.

  let guessedCorrectly = false;

  //Now we check if the letter corresponds to any letter in the word array:

  for (let i = 0; i < wordLength; i++) {

    //If the letters correspond, we add the letter - in caps - to the displayArray:

    if (compareLetters(guessedLetter, wordArray[i]) === true) {
      displayArray[i] = guessedLetter.toUpperCase();

      //Then we set our guess boolean to true:

      guessedCorrectly = true;
      correctGuesses++;
    }
  }

  //If the guess is true, we add one to the number of correct guesses.
  //If not, we add one to the number of wrong guesses.

  if (guessedCorrectly === false) {
    failedGuesses++;
  }

  //If the number of correct guesses equals the length of the word,
  //you have guessed the whole word and you WIN!
  //If you've guessed too many times you lose.

  if (correctGuesses === wordLength) {
    displayString = displayArray.join(" ");
    arrayText(displayString);
    gameText('You WIN!');
    formEl.style.display = "none";
    guessEl.value = "";
    return;
  } else if (failedGuesses === guessesAllowed) {
    gameText("You lose!");
    guessEl.value = "";
    formEl.style.display = "none";
    playLoseSound();
    return;
  }

  //If you guessed correctly, but you still haven't guessed the whole word...

  else if (guessedCorrectly === true) {
    gameText("You guessed correctly!");
    guessEl.value = "";
  }

  //If you guess wrong:

  else if (guessedCorrectly === false) {
    gameText(
      `You guessed wrong! You have ${guessesAllowed - failedGuesses} 
      guesses remaining!`
    );
    guessEl.value = "";
  }

  displayString = displayArray.join(" ");
  arrayText(displayString);
});


//*********************************//
//*********************************//

//FUNCTIONS:

//*********************************//
//*********************************//



//This is the function for comparing two letters. It turns both to lower
//case and compares them, and if they are the same, the function returns true.

function compareLetters(letterA, letterB) {
  return letterA.toLowerCase() === letterB.toLowerCase();
}

//Function for displaying the text in the display array:

function arrayText(arrayTextVar) {
  let arrayTextEl = document.querySelector(".arrayTextClass");
  arrayTextEl.innerHTML = arrayTextVar;
}

//Function for displaying game texts and prompts:

function gameText(gameTextVar) {
  let gameTextEl = document.querySelector(".gameTextClass");
  gameTextEl.innerHTML = gameTextVar;
}

function playLoseSound() {
  let loseSound = document.getElementById('gallows');
  loseSound.play();

  let hangmanEl = document.querySelector('.hangman');
  hangmanEl.style.animationPlayState = 'running';

  let hangmanEl2 = document.querySelector('.hangmanContainer');
  hangmanEl2.style.animationPlayState = 'running';
}


//Function for displaying a prompt, and transfering the form input to the relevant variable:

// function playerPrompt(promptMessage) {
//   let displayGameEl = document.querySelector(".gameTextClass");
//   displayGameEl.innerHTML = promptMessage;

//   let formEl = document.querySelector("#guessForm");
//   let guessValue;

//   formEl.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let guessEl = document.querySelector("#guess");
//     guessValue = guessEl.value;
//   });

//   return guessValue;
// }