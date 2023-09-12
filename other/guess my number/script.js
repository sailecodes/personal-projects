'use strict';

const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = Number(document.querySelector('.score').textContent);

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;

      if (guess > secretNumber) {
        document.querySelector('.message').textContent = '📈 Too high';
      } else {
        document.querySelector('.message').textContent = '📉 Too low';
      }
    } else if (score == 1) {
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
