'use strict';

const DEFAULT_SCORE = 20;
const DEFAULT_MSSG = 'Start guessing...';
const DEFAULT_NUM = '?';
const CORRECT_GUESS = '🎉 Correct Number!';
const HIGH_GUESS = '📈 Too high';
const LOW_GUESS = '📉 Too low';

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = DEFAULT_SCORE;

  document.querySelector('.message').textContent = DEFAULT_MSSG;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = DEFAULT_NUM;
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  // CASE 1: No input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  }
  // CASE 2: Correct guess
  else if (guess === secretNumber) {
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.message').textContent = CORRECT_GUESS;
  } else {
    // CASE 3: Player has more turns
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;

      // CASE 3a: High guess
      if (guess > secretNumber) {
        document.querySelector('.message').textContent = HIGH_GUESS;
      }
      // CASE 3b: Low guess
      else {
        document.querySelector('.message').textContent = LOW_GUESS;
      }
    }
    // CASE 4: Player has no more turns -- LOSE
    else if (score == 1) {
      score--;
      document.querySelector('.score').textContent = score;
      document.querySelector('.message').textContent = '🫠 You lost the game!';
    }
  }
});

/*console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 24;
console.log(document.querySelector('.guess').value);*/
