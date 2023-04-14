/**
 * Checks if a string is a positive number or not.
 *
 * Examples:
 *
 * '0'    : false \
 * 'abc'  : false \
 * '-1'   : false \
 * '001'  : true \
 * '1.23' : true \
 * 'Infinity' : true
 */
const isPositive = function isPositiveNumber(str) {
  if (!Number.isNaN(str) && Number(str) > 0) {
    return true;
  }
  return false;
};

/**
 * Checks if a string is a palindrome or not.
 */
const isPalindrome = function isPalindrome(str) {
  const len = str.length;
  const halfway = Math.floor(len / 2);
  for (let i = 0; i < halfway; i += 1) {
    if (!(str[i] === str[len - i - 1])) {
      return false;
    }
  }
  return true;
};

const inputBox = document.querySelector('input');
const result = document.getElementById('result');

/**
 * Display correct message in response to any user input into `inputBox`.
 */
const handleEvent = function handleEvent() {
  result.style.color = 'darkRed';
  result.style.fontWeight = 'bold';

  if (!isPositive(inputBox.value)) {
    result.innerHTML = 'Input must be a positive number.';
  } else if (!isPalindrome(inputBox.value)) {
    result.innerHTML = 'No. Try again';
  } else {
    result.style.color = 'darkGreen';
    result.innerHTML = 'Yes. This is a palindrome!';
  }
};

inputBox.addEventListener('input', handleEvent);
