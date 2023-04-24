const body = document.querySelector('body');

/**
 * Returns a random integer between 0 and `max` (exclusive)
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Returns a random hsla color string
 */
const buildColor = function buildHslaColor() {
  const h = getRandomInt(360 + 1).toString();
  const s = getRandomInt(100 + 1).toString();
  const l = getRandomInt(100 + 1).toString();
  return `hsla(${h}, ${s}%, ${l}%, 0.5)`;
};

const setBGColor = function setBGColor() {
  body.style.backgroundColor = buildColor();
};

// Add your code here
window.addEventListener('load', () => {
  setBGColor();
});

let intervalID = null;
const btn = document.querySelector('#button');
btn.addEventListener('click', () => {
  if (btn.classList.contains('start')) {
    btn.classList.remove('start');
    btn.classList.add('stop');
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    btn.textContent = 'Stop';
    intervalID = setInterval(setBGColor, 3000);
  } else {
    btn.classList.remove('stop');
    btn.classList.add('start');
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-primary');
    btn.textContent = 'Start';
    clearInterval(intervalID);
    intervalID = null;
  }
});
