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

const clearDivText = function clearDivText(elementID) {
  document.getElementById(elementID).innerHTML = '';
};

const handleInput = function handleInput() {
  const paragraph = document.getElementById('paragraph');
  clearDivText('paragraph');
  const loc = findWord(inputBox.value, paragraphText);
  paragraph.innerHTML = paragraphText.substring(0, loc + 1);
  const spanElem = document.createElement('span');
  const len = inputBox.value.length;
  const start = loc + 1;
  const end = start + len;
  spanElem.innerHTML = paragraphText.substring(start, end);
  spanElem.style.backgroundColor = 'yellow';
  paragraph.append(spanElem);
  paragraph.append(paragraphText.substring(end, paragraphText.length));
};

// inputBox.addEventListener('keydown', handleKeyDown);
inputBox.addEventListener('input', handleInput);
