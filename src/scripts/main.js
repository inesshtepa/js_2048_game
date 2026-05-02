'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const cells = [...document.querySelectorAll('.field-cell')];
const score = document.querySelector('.game-score');
const button = document.querySelector('.button');

const startMessage = document.querySelector('.message-start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');

function render() {
  const state = game.getState();

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const value = state[row][col];

    cell.textContent = value || '';
    cell.className = 'field-cell';

    if (value) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  score.textContent = String(game.getScore());

  startMessage.classList.toggle('hidden', game.getStatus() !== 'idle');
  winMessage.classList.toggle('hidden', game.getStatus() !== 'win');
  loseMessage.classList.toggle('hidden', game.getStatus() !== 'lose');
}

button.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();

    button.textContent = 'Restart';
    button.classList.remove('start');
    button.classList.add('restart');
  } else {
    game.restart();

    button.textContent = 'Start';
    button.classList.remove('restart');
    button.classList.add('start');
  }

  render();
});

document.addEventListener('keydown', () => {
  const moves = {
    ArrowLeft: () => game.moveLeft(),
    ArrowRight: () => game.moveRight(),
    ArrowUp: () => game.moveUp(),
    ArrowDown: () => game.moveDown(),
  };

  if (!moves[event.key]) {
    return;
  }

  event.preventDefault();
  moves[event.key]();

  render();
});

render();
