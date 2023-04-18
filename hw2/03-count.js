/* eslint-disable no-console */

const inputBox = document.querySelector('input');
const oldText = document.querySelector('#paragraph').textContent;

/**
 * Returns false if any characters of `word` are non-alphanumeric
 */
const isValid = function isValid(word) {
  const re = /^[A-z0-9]*$/;
  return re.test(word);
};

/**
 * Returns the location of `word` in `text`.
 * If word is not found returns -1.
 */
const highlightWords = function highlightWords() {
  const word = inputBox.value;
  let newText = oldText;
  if (!isValid(word)) {
    document.getElementById('paragraph').innerHTML = oldText;
    return;
  }
  if (word === '') return;

  const pattern1 = `[\\s]${word}[\\s]`;
  const re1 = new RegExp(pattern1, 'g');
  console.log(oldText);
  newText = newText.replace(re1, ` <span class="highlight">${word}</span> `);

  const pattern2 = `[\\s]${word}[,]`;
  const re2 = new RegExp(pattern2, 'g');
  console.log(oldText);
  newText = newText.replace(re2, ` <span class="highlight">${word}</span>,`);

  const pattern3 = `[\\s]${word}[.]`;
  const re3 = new RegExp(pattern3, 'g');
  console.log(oldText);
  newText = newText.replace(re3, ` <span class="highlight">${word}</span>.`);

  const pattern4 = `[\\s]${word}[—]`;
  const re4 = new RegExp(pattern4, 'g');
  console.log(oldText);
  newText = newText.replace(re4, ` <span class="highlight">${word}</span>—`);

  const pattern5 = `[—]${word}[\\s]`;
  const re5 = new RegExp(pattern5, 'g');
  console.log(oldText);
  newText = newText.replace(re5, `—<span class="highlight">${word}</span> `);
  document.getElementById('paragraph').innerHTML = newText;
};

const handleInput = function handleInput() {
  highlightWords();
};

// inputBox.addEventListener('keydown', handleKeyDown);
inputBox.addEventListener('input', handleInput);
