'use strict';

const getRandom = function () {
  return Number(Math.trunc(Math.random() * 20) + 1);
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Sound Effects
let loseSound = new Audio('dead-8bit-41400.mp3');
let succesSound = new Audio('8-bit-powerup-6768.mp3');

let secretNumber = getRandom();
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  let message = '🎉 Correct Number!'; // defult

  if (!guess) message = '⛔️ No number!';
  else if (guess !== secretNumber) {
    message = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';

    if (score > 1) score--;
    else {
      message = '💥 You lost the game!';
      document.querySelector('body').style.backgroundColor = 'red';
      document.querySelector('.number').textContent = secretNumber;
      loseSound.play();
    }
  } else {
    succesSound.play();
    highscore = Math.max(highscore, score);
    document.querySelector('.highscore').textContent = highscore;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
  }

  document.querySelector('.score').textContent = score;
  displayMessage(message);
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = getRandom();

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  displayMessage('Start guessing...');
});
