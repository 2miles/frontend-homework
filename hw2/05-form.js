/* eslint-disable no-console */

const form = document.querySelector('#form');

const buildClassesStr = function buildClassesStr(boxes) {
  const classes = [];
  boxes.forEach((i) => {
    classes.push(i.value);
  });
  let classesStr = 'None';
  if (classes.length > 0) {
    classesStr = classes.join(', ');
  }
  return classesStr;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const reg = document.querySelector('#registration');
  const regStr = reg.options[reg.selectedIndex].text;
  const checkBoxes = document.querySelectorAll('input[name=courses]:checked');
  const textArea = document.querySelector('#anything_else');
  let anythingElse = 'n/a';
  if (textArea.value) {
    anythingElse = textArea.value;
  }

  console.log(`\
  FULL NAME:      ${fullName}\n\
  EMAIL:          ${email}\n\
  REGISTRATION :  ${regStr}\n\
  CLASSES TAKEN:  ${buildClassesStr(checkBoxes)}\n\
  ANYTHING ELSE:  ${anythingElse}`);
});
