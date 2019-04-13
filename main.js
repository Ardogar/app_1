
var $titleTime = document.querySelector('.title-time');
var $titleResult = document.querySelector('.title-result');
var $time = document.querySelector('.time');
var $result = document.querySelector('.result');
var $gameWindow = document.querySelector('.game-window');
var $play = document.querySelector('.start-game');
var $setTimeGame = document.querySelector('.time-game');

var isGameStarted = false;
var score = 0;



$play.addEventListener('click', startGame);
$gameWindow.addEventListener('click', clickHandleBox);
$setTimeGame.addEventListener('input', getTimeGame);


function hidden($elem) {
  $elem.classList.add('hidden')
}

function show($elem) {
  $elem.classList.remove('hidden');
}


function startGame() {
  score = 0;
  isGameStarted = true;
  $setTimeGame.setAttribute('disabled', 'disabled');
  hidden($play);
  getTimeGame();
  $gameWindow.style.backgroundColor = generatedColor();
  var inteval = setInterval(function () {
    var time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(inteval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  generatedBox();
}
function generatedBox() {
  $gameWindow.innerHTML = '';

  var box = document.createElement('div');
  var boxSize = generatedRandom(20, 100);
  var gameSize = $gameWindow.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  box.style.width = box.style.height = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.top = generatedRandom(0, maxTop) + 'px';
  box.style.left = generatedRandom(0, maxLeft) + 'px';
  box.style.backgroundColor = generatedColor();
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $gameWindow.insertAdjacentElement("beforeend", box);

}

function generatedRandom(min, max) {

  var result = Math.floor(Math.random() * (max - min) + min);
  return +result;
}

function clickHandleBox(event) {
  if (!isGameStarted) {
    return;
  } else if (event.target.dataset.box) {
    score++
    generatedBox();
  }
}

function getTimeGame() {
  var time = +$setTimeGame.value;

  $time.textContent = time.toFixed(1)
  hidden($titleResult);
  show($titleTime);
}

function endGame() {
  isGameStarted = false;
  $gameWindow.innerHTML = '';
  $result.textContent = score;
  hidden($titleTime);
  show($titleResult);
  setTimeout(function () {
    show($play);
    $setTimeGame.removeAttribute('disabled');
    $gameWindow.style.backgroundColor = '#55aa00';
  }, 1000);

}

function generatedColor() {
  var c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1)
  }
  return '#' + c;
}


