/* eslint-disable no-console */

const inputBox = document.querySelector('input');
const paragraphText = document.querySelector('#paragraph').textContent;

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
const findWord = function findWord(word, text) {
  if (!isValid(word)) return -1;
  const pattern = ` ${word}[^A-z]`;
  const re = new RegExp(pattern);
  return text.search(re);
};

const handleInput = function handleInput() {
  const result = findWord(inputBox.value, paragraphText);
  console.log(result);
};

// inputBox.addEventListener('keydown', handleKeyDown);
inputBox.addEventListener('input', handleInput);
