// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText1 = document.querySelector(".results__text1");
const resultText2 = document.querySelector(".results__text2");

const playAgainBtn = document.querySelector(".play-again");
const rePlayBtn = document.querySelector(".re-play");

const compScoreNum = document.querySelector(".compscore");
const userScoreNum = document.querySelector(".yourscore");

const nextBtn = document.querySelector(".next-btn");

let yourchoice = "null";

//Local Storage


// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcchoice = pcChoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText1.innerText = "YOU WIN";
      resultText2.innerText = "AGAINST PC";
      resultDivs[0].classList.toggle("winner");
      updateYourScore();
      nextBtn.style.opacity="1";
      playAgainBtn.style.opacity="1";
      rePlayBtn.style.opacity="0";
    } else if (pcWins) {
      resultText1.innerText = "YOU LOST";
      resultText2.innerText = "AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      updateCompScore();
      playAgainBtn.style.opacity="1";
      rePlayBtn.style.opacity="0";
    } else {
      resultText1.innerText = "TIE UP";
      resultText2.innerText = "";
      playAgainBtn.style.opacity="0";
      rePlayBtn.style.opacity="1";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
    
    showUpdateYourScore();
    showUpdateCompScore();

  }, 1000);
}

//comp score 

function storeDataComp(compScoreVal) {
  localStorage.setItem("compScoreNum",compScoreVal);
}

function retrieveDataComp() {
  let storedCompScore = localStorage.getItem("compScoreNum");
  if (storedCompScore !== null) {
    return parseInt(storedCompScore);
  } else {
    return 0; //return 0 if no score is stored
  }
}

//retrieve the comp's score
let compScoreRetrieve = retrieveDataComp();

function showUpdateCompScore() {
  compScoreNum.textContent = compScoreRetrieve;
}
showUpdateCompScore();

function updateCompScore() {
  let newCompScore = compScoreRetrieve ? compScoreRetrieve + 1 : 1;
  //updating the displayed score
  compScoreRetrieve = newCompScore;
  showUpdateCompScore();
  //store the updated score in local storage
  storeDataComp(newCompScore);
}

//user score 

function storeDataUser(userScoreVal) {
  localStorage.setItem("userScoreNum",userScoreVal);
}

function retrieveDataUser() {
  let storedUserScore = localStorage.getItem("userScoreNum");
  if (storedUserScore !== null) {
    return parseInt(storedUserScore);
  } else {
    return 0; //return 0 if no score is stored
  }
}

//retrieve the comp's score
let userScoreRetrieve = retrieveDataUser();

function showUpdateYourScore() {
  userScoreNum.textContent = userScoreRetrieve;
}
showUpdateYourScore();

function updateYourScore() {
  let newUserScore = userScoreRetrieve ? userScoreRetrieve + 1 : 1;
  //updating the displayed score
  userScoreRetrieve = newUserScore;
  showUpdateYourScore();
  //store the updated score in local storage
  storeDataUser(newUserScore);
}

function savePageStateToCache(){
  sessionStorage.setItem("cachedPageState", document.documentElement.innerHTML);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  nextBtn.style.opacity="0";

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText1.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules1
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});