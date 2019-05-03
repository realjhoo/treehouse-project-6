const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let winner = 0;
let correctTries = 0;
let incorrectTries = 0;
let missed = 0;
let rnd_phrase = "";

// These are the TEST phrases for the game
const phrases = [
   "This is the first phrase",
   "The second phrase is right here",
   "King George the Third liked this phrase",
   "May the fourth phrase be with you",
   "A fifth phrase is five too many"
];

// FUNCTIONS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function hideInitialOverlay() {
   document.getElementById("overlay").style.display = "none";
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function getRandomPhraseAsArray(array) {
   let max = array.length - 1;
   let rnd_num = Math.floor(Math.random() * (max + 1));
   rnd_phrase = array[rnd_num];

   // split the string into a char array
   let rnd_phrase_array = rnd_phrase.split("");

   return rnd_phrase_array;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function addPhraseToDisplay(array) {
   // initialize variables to prevent undefined error
   let letter_list_item = "";
   let temp_list_item = "";

   for (var i = 0; i < array.length; i++) {
      if (array[i] == " ") {
         // if its a space add li tags
         temp_list_item = "<li>" + array[i] + "</li>";
      } else {
         temp_list_item = "<li class = 'letter'>" + array[i] + "</li>";
         winner++; // track the number of letters in puzzle
      }

      letter_list_item = letter_list_item + temp_list_item;
   }

   // bookend the ul tags, cuz they wont survive innerHTML
   letter_list_item = "<ul>" + letter_list_item + "</ul>";

   // jam it back in the DOM
   phrase.innerHTML = letter_list_item;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function checkLetter(btn_clicked) {
   let foundIt = false;
   let letterChk = document.getElementsByClassName("letter");

   for (var i = 0; i < letterChk.length; i++) {
      let isin = letterChk[i].innerHTML.toLowerCase();

      if (isin.includes(btn_clicked)) {
         letterChk[i].classList.add("show");
         correctTries++; // track the number of correct guesses
         foundIt = true; // set a flag
      }
   }

   if (foundIt) {
      return btn_clicked;
   } else {
      incorrectTries++; //track the number of incorrect guesses
      let tries = document.getElementsByTagName("img");
      tries[incorrectTries - 1].setAttribute("src", "images/lostHeart.png");
      return null;
   }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function checkWin() {
   if (correctTries == winner) {
      // =-=-=-= WINNER =-=-=-=-=-=
      document.getElementById("title").textContent = "Wheel of Victory!";
      let winOverlay = document.getElementById("overlay");
      winOverlay.classList.add("win");
      winOverlay.style.display = "flex";
      winOverlay.style.zIndex = 5;

      document.getElementById("btn_reset").textContent = "Play Again";

      document.getElementById("btn_reset").addEventListener("click", reset);
   } else if (incorrectTries >= 5) {
      // =-=-=-= LOSER =-=-=-=-=-=
      document.getElementById("title").textContent = "Wheel of Failure!";
      let loseOverlay = document.getElementById("overlay");
      loseOverlay.classList.add("lose");
      loseOverlay.style.display = "flex";
      loseOverlay.style.zIndex = 5;
      document.getElementById("btn_reset").textContent = "Play Again";

      document.getElementById("btn_reset").addEventListener("click", reset);
   }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function reset() {
   // reset the global variables
   winner = 0;
   correctTries = 0;
   incorrectTries = 0;
   missed = 0;
   rnd_phrase = "";

   //    reset the puzzle
   const phraseArray = getRandomPhraseAsArray(phrases);
   addPhraseToDisplay(phraseArray);

   //    reenable the keyboard
   let keyboard = document.getElementsByTagName("button");
   for (i = 0; i < keyboard.length; i++) {
      keyboard[i].disabled = false;
   }

   //    reset the hearts
   let hearts = document.getElementsByTagName("img");
   for (i = 0; i < 5; i++) {
      hearts[i].setAttribute("src", "images/liveHeart.png");
   }

   //    reset the overlay
   let resetOverlay = document.getElementById("overlay");
   resetOverlay.classList.remove("win");
   resetOverlay.classList.remove("lose");
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                              MAIN PROCEDURE
function main() {
   document
      .getElementById("btn_reset")
      .addEventListener("click", hideInitialOverlay);

   const phraseArray = getRandomPhraseAsArray(phrases);

   addPhraseToDisplay(phraseArray);

   // event listener for virtual keyboard
   qwerty.addEventListener("click", event => {
      if (event.target.tagName == "BUTTON") {
         checkLetter(event.target.innerHTML);
         event.target.disabled = true; // disable the clicked letter
         checkWin();
      }
   });
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

main();
// =-=-=-=-=-=-=-=-=-=      THE GAME ENDS HERE     =-=-=-=-=-=-=-=-=-=
