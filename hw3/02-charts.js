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
 * Uses array destructuring and the Set constructor to remove duplicates
 */
const removeDups = function removeDups(arr) {
  return [...new Set(arr)];
};
/**
 * Removes typos and removes everyone who is not in a house.
 */
const cleanNames = function cleanNames(familyNames) {
  const names = familyNames;
  const goodNames = [];
  names.forEach((name, index) => {
    let goodName = name;
    if (name.includes('Targar')) {
      goodName = 'House Targaryen';
    }
    if (name.includes('Lan')) {
      goodName = 'House Lannister';
    } else if (name.includes('Stark')) {
      goodName = 'House Stark';
    } else if (name.includes('Bara')) {
      goodName = 'House Baratheon';
    } else if (name.includes('Grey')) {
      goodName = 'House Greyjoy';
    } else if (name.includes('Tyrell')) {
      goodName = 'House Tyrell';
    }
    names[index] = goodName;
  });
  names.forEach((name) => {
    if (name.includes('House')) {
      goodNames.push(name);
    }
  });
  goodNames.sort();
  return goodNames;
};

/**
 * Return a list of counts of people with each name.
 */
const buildCountList = function buildCountList(people, houses) {
  const counts = [];
  houses.forEach((house, index) => {
    counts[index] = 0;
    people.forEach((person) => {
      if (person === house) {
        counts[index] += 1;
      }
    });
  });
  return counts;
};

let houses = [];
let counts = [];

const renderChart = () => {
  const donutChart = document.querySelector('.donut-chart');
  // eslint-disable-next-line no-new, no-undef
  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: houses,
      datasets: [
        {
          label: 'My First Dataset',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
    },
  });
};

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const gotData = data;
    let people = [];
    gotData.forEach((person) => {
      people.push(person.family);
    });
    people = cleanNames(people);
    houses = removeDups(people);
    counts = buildCountList(people, houses);
  })
  .then(renderChart)
  .catch((err) => console.log(err));

// renderChart();
