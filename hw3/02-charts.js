const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

/**
 * Removes typos and sorts the the GOT family name array.
 */
const cleanNames = function cleanNames(familyArr) {
  const families = familyArr;
  familyArr.forEach((e, index) => {
    let newE = e;
    if (e.includes('House')) {
      newE = e.split(' ').slice(1).join(' ');
      families[index] = newE;
    }
    if (e === '') {
      newE = 'None';
    } else if (e.includes('Targar')) {
      newE = 'Targaryen';
    } else if (e.includes('Unk')) {
      newE = 'Unknown';
    } else if (e.includes('Lan')) {
      newE = 'Lannister';
    } else if (e.includes('Lor')) {
      newE = 'Lorath';
    }
    families[index] = newE;
  });
  return families.sort();
};

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // const characters = data;
    // characters.forEach((character) => {
    // });
    const gotData = data;
    const families = [];
    gotData.forEach((character) => {
      families.push(character.family);
    });
    cleanNames(families);
    console.log(families);
  })
  .catch((err) => console.log(err));

const renderChart = () => {
  const donutChart = document.querySelector('.donut-chart');

  // eslint-disable-next-line no-new, no-undef
  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: ['label', 'label', 'label', 'label'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [1, 12, 33, 5],
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

renderChart();
