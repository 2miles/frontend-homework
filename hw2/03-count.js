/* eslint-disable no-console */

const inputBox = document.querySelector('input');
const oldText = document.querySelector('#paragraph').textContent;

/**
 * Returns false if `word` is actually multiple words.
 */
const isOneWord = function isOneWord(word) {
  const trimmedWord = word.trim();
  const re = /^[^ ]*$/;
  return re.test(trimmedWord);
};

/**
 * Returns false if `word` is actually multiple words.
 */
const replace = function replace(text, pattern, replacement) {
  const re = new RegExp(pattern, 'g');
  return text.replace(re, replacement);
};

const highlightWords = function highlightWords() {
  let text = oldText;
  const word = inputBox.value.trim();
  if (isOneWord(word) === false) {
    document.getElementById('paragraph').innerHTML = oldText;
    return;
  }
  text = replace(text, `[\\s]${word}[\\s]`, ` <span>${word}</span> `);
  text = replace(text, `[\\s]${word}[,]`, ` <span>${word}</span>,`);
  text = replace(text, `[\\s]${word}[.]`, ` <span>${word}</span>.`);
  text = replace(text, `[\\s]${word}[—]`, ` <span>${word}</span>—`);
  text = replace(text, `[—]${word}[\\s]`, `—<span>${word}</span> `);

  document.getElementById('paragraph').innerHTML = text;
};

const handleInput = function handleInput() {
  highlightWords();
};

// inputBox.addEventListener('keydown', handleKeyDown);
inputBox.addEventListener('input', handleInput);
