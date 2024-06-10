let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let intervalId; 
let isAutoPlaying = false;
updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock')
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper')
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors')
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img src="Exercises/${playerMove}-emoji.png" class="move-button move-icon"> - <img src="Exercises/${computerMove}-emoji.png" class="move-button move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}


document.querySelector('.js-reset-button').addEventListener('click', () => {
  reset()
})
function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay()
})
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing'
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play'
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
  
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock')
  }
  if (event.key === 'p') {
    playGame('paper')
  }
  if (event.key === 's') {
    playGame('scissors')
  }
  if (event.key === 'a') {
    autoPlay()
  }
  if (event.key === ' ') {
    let confirmation = `
      Are you sure you want to reset the score? 
      <button class="js-yes-confirmation">Yes</button> 
      <button class="js-no-confirmation">No</button>
    `
    document.querySelector('.js-confirmation').innerHTML = `${confirmation}`
    document.querySelector('.js-yes-confirmation').addEventListener('click', () => {
      reset()
      document.querySelector('.js-confirmation').innerHTML = ''
    })
    document.querySelector('.js-no-confirmation').addEventListener('click', () => {
      document.querySelector('.js-confirmation').innerHTML = ''
    })
  }
})