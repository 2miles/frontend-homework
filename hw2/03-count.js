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
  document.getElementById(elementID).innerText = '';
};

const handleInput = function handleInput() {
  const paragraph = document.getElementById('paragraph');
  clearDivText('paragraph');
  const resultIndex = findWord(inputBox.value, paragraphText);
  paragraph.innerHTML = paragraphText.substring(0, resultIndex + 1);
  const highlighted = document.createElement('span');
  highlighted.innerHTML = paragraphText.substring(
    resultIndex + 1,
    resultIndex + 1 + inputBox.value.length,
  );
  highlighted.style.backgroundColor = 'yellow';
  paragraph.append(highlighted);
  paragraph.append(
    paragraphText.substring(
      resultIndex + 1 + inputBox.value.length,
      paragraphText.length,
    ),
  );

  console.log(resultIndex);
};

// inputBox.addEventListener('keydown', handleKeyDown);
inputBox.addEventListener('input', handleInput);
