alert("HANGMAN");

let userInputWord = prompt("Please enter a word!");

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
alert(displayString);

//How many guesses are allowed?

let guessesAllowed = 7;
alert(`You have ${guessesAllowed} guesses!`);

let failedGuesses = 0;
let correctGuesses = 0;

//The main game loop. This loop runs as long as the number of wrong
//guesses is lower than the number of allowed guesses:

while (failedGuesses < guessesAllowed) {
  //Prompting the player to guess a letter:

  let guessedLetter;

  //We have to make sure that the letter hasn't already been guessed,
  //otherwise we can keep guessing the same (correct) letter and still win.

  while (true) {
    guessedLetter = prompt("Please guess a letter!");

    let originalLetter = true;

    //We're checking the guessed letter against the displayArray,
    //in order to make sure it hasn't already been logged in the correct answer.

    for (let i = 0; i < wordLength; i++) {
      if (compareLetters(guessedLetter, displayArray[i])) {
        originalLetter = false;
      }
    }

    if (originalLetter) {
      break;
    } else {
      alert("You have already guessed that letter!");
    }
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
    alert(`${displayString} - You WIN!`);

    break;
  } else if (failedGuesses === guessesAllowed) {
    alert("You lose!");
    break;
  }

  //If you guessed correctly, but you still haven't guessed the whole word...
  else if (guessedCorrectly === true) {
    alert("You guessed correctly!");
  }

  //If you guess wrong:
  else if (guessedCorrectly === false) {
    alert(
      `You guessed wrong! You have ${guessesAllowed - failedGuesses} 
      guesses remaining!`
    );
  }

  displayString = displayArray.join(" ");
  alert(displayString);
}

//This is the function for comparing two letters. It turns both to lower
//case and compares them, and if they are the same, the function returns true.

function compareLetters(letterA, letterB) {
  return letterA.toLowerCase() === letterB.toLowerCase();
}
