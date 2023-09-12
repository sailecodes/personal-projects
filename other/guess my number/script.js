'use strict';

const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = Number(document.querySelector('.score').textContent);

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  // CASE 1: No input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  }
  // CASE 2: Correct guess
  else if (guess === secretNumber) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else {
    // CASE 3: Player has more turns
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;

      // CASE 3a: High guess
      if (guess > secretNumber) {
        document.querySelector('.message').textContent = '📈 Too high';
      }
      // CASE 3b: Low guess
      else {
        document.querySelector('.message').textContent = '📉 Too low';
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
