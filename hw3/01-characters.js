// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const list = document.querySelector('#character-list');

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const characters = data;
    characters.forEach((character) => {
      /** create card div */
      const divCard = document.createElement('divCard');
      divCard.className = 'card border-0 m-3 text-center';
      divCard.style.width = '250px';
      divCard.style.backgroundColor = 'var(--cyan)';

      /** create img */
      const pic = document.createElement('img');
      pic.className = 'card-img-top p-3';
      pic.setAttribute('src', character.imageUrl);
      pic.setAttribute('width', '220px');
      pic.setAttribute('height', '260px');

      /** create card-body div */
      const divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');

      /** create name h5 */
      const fullName = document.createElement('h5');
      fullName.className = 'card-title fw-bold';
      fullName.innerHTML = `${character.firstName} ${character.lastName}`;

      /** create title p */
      const title = document.createElement('p');
      title.className = 'card-text fw-bold';
      title.innerHTML = `${character.title}`;

      /** add elements to card and add card to DOM */
      divCardBody.appendChild(fullName);
      divCardBody.appendChild(title);
      divCard.appendChild(pic);
      divCard.appendChild(divCardBody);
      list.appendChild(divCard);

      divCard.addEventListener('mouseenter', () => {
        divCard.style.backgroundColor = 'var(--blue)';
        fullName.style.color = 'white';
        title.style.color = 'white';
      });
      divCard.addEventListener('mouseleave', () => {
        divCard.style.backgroundColor = 'var(--cyan)';
        fullName.style.color = 'black';
        title.style.color = 'black';
      });
    });
  })
  .catch((err) => console.log(err));
