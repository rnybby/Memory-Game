const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!





let clickedCards = [];
let clicks = 0;
let canClick= true;
let score = 0;
let tries = 0;
const userScore = document.querySelector('#score');
const userTries = document.querySelector('#tries');

function checkMatch(){
  const [card1, card2] = clickedCards;
if(card1.classList[0] === card2.classList[0]){
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  score++;
  userScore.innerText = `Your Score: ${score}`;
  console.log(`score: ${score}`)
} else {
  card1.style.backgroundColor = "";
  card2.style.backgroundColor = "";
  tries++
  userTries.innerText = `# of Guesses: ${tries}`;
  console.log(`tries: ${tries}`)
}

clickedCards = [];
  clicks = 0;
  canClick = true;

}


function handleCardClick(event) {
  if(!canClick) //if canClick is not truthy, if !canClick is true,run return
    return;
  
  const clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  clickedCards.push(clickedCard);
  clicks++;
  if (clicks === 2) {
    canClick = false;
    setTimeout(checkMatch, 1000); 
  }
  
  console.log("you just clicked", event.target);
}

// when the DOM loads
let btn = document.querySelector('#start');
let resBtn = document.querySelector('#reset');
function startGame() {
  createDivsForColors(shuffledColors);
  btn.removeEventListener('click', startGame);
  console.log('Game started');
}
btn.addEventListener('click', startGame);

function resetGame() {
  gameContainer.innerHTML = "";
  userScore.innerText = 'Your Score:';
  userTries.innerText = '# of Guesses:';
  tries = 0;
  score = 0;
  btn.addEventListener('click', startGame);
}
resBtn.addEventListener('click',() =>{
  resetGame()
})
