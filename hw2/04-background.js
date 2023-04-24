let interval = 3000;
/**
 * Returns a random integer between 0 and `max` (exclusive)
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Returns a random hsla color string with a 0.5 alpha value
 */
const buildColor = function buildHslaColor() {
  const h = getRandomInt(360 + 1).toString();
  const s = getRandomInt(100 + 1).toString();
  const l = getRandomInt(100 + 1).toString();
  return `hsla(${h}, ${s}%, ${l}%, 0.5)`;
};

const setRandomBGColor = function setBGColor() {
  const body = document.querySelector('body');
  body.style.backgroundColor = buildColor();
};

/**
 * Set the background to a random color when the page loads
 */
window.addEventListener('load', setRandomBGColor);

const inputBox = document.querySelector('#user-input');

/**
 * Parse `inputBox` value string as a positive integer representing number
 * of seconds. Return that amount in milliseconds. If input is not a positive
 * integer, return 3000.
 */
const parseTextBox = function parseTextBox() {
  const inputAsInt = parseInt(inputBox.value, 10);
  if (inputAsInt < 1 || Number.isNaN(inputAsInt)) return 3000;
  return inputAsInt * 1000;
};

const updateInterval = function updateInterval() {
  interval = parseTextBox();
};

inputBox.addEventListener('input', updateInterval);

const btn = document.querySelector('#button');
let intervalID = null;

const handleButtonEvent = function handleButtonEvent() {
  if (btn.classList.contains('start')) {
    btn.classList.remove('start');
    btn.classList.add('stop');
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    btn.textContent = 'Stop';
    intervalID = setInterval(setRandomBGColor, interval);
  } else {
    btn.classList.remove('stop');
    btn.classList.add('start');
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-primary');
    btn.textContent = 'Start';
    clearInterval(intervalID);
    intervalID = null;
  }
};

btn.addEventListener('click', handleButtonEvent);
