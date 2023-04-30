/**
 * Returns false if `word` is separated by any blank spaces.
 */
const isOneWord = function isOneWord(word) {
  const trimmedWord = word.trim();
  const re = /^[^ ]*$/;
  return re.test(trimmedWord);
};

/**
 * Searches through `originalText` for every instance of `userInput` as a
 * 'singular word' then wraps it in a HTML span tag so that it can be
 * highlighted with CSS.
 *
 * 'singular word' is defined here as any any contiguous text preceded by a
 * blank space or a em-dash, and succeeded by either a comma, period, em-dash or
 * a blank space. `userInput`'s leading and trailing whitespace is not considered.
 * Multiple words or partial words will not be matched.
 *
 * @todo Find a better (less brute-forced and less paragraph-specific) way
 * to search-and-replace using regex.
 */
const highlight = function highlight(originalText, userInput) {
  const paragraph = document.querySelector('#paragraph');
  const word = userInput.trim();
  if (!isOneWord(word)) {
    paragraph.textContent = originalText;
    return;
  }
  let text = originalText;
  text = text.replace(RegExp(` ${word}[\\s]`, 'g'), ` <span>${word}</span> `);
  text = text.replace(RegExp(` ${word}[,]`, 'g'), ` <span>${word}</span>,`);
  text = text.replace(RegExp(` ${word}[.]`), ` <span>${word}</span>.`);
  text = text.replace(RegExp(` ${word}[—]`, 'g'), ` <span>${word}</span>—`);
  text = text.replace(RegExp(`[—]${word}[\\s]`, 'g'), `—<span>${word}</span> `);
  paragraph.innerHTML = text;
};

const handleInput = function handleInput() {
  const text = document.querySelector('#paragraph').textContent;
  const userInput = document.querySelector('input').value;
  highlight(text, userInput);
};

const inputBox = document.querySelector('input');
inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleInput();
});
