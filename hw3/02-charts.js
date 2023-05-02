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
const cleanFamilyNames = function cleanFamilyNames(familyNames) {
  const names = familyNames;
  names.forEach((name, index) => {
    let goodName = name;
    if (name.includes('House')) {
      goodName = name.split(' ').slice(1).join(' ');
      names[index] = goodName;
    }
    if (name === '') {
      goodName = 'None';
    } else if (name.includes('Targar')) {
      goodName = 'Targaryen';
    } else if (name.includes('Unk')) {
      goodName = 'Unknown';
    } else if (name.includes('Lan')) {
      goodName = 'Lannister';
    } else if (name.includes('Lor')) {
      goodName = 'Lorath';
    }
    names[index] = goodName;
  });
  return names.sort();
};

/**
 * Uses array destructuring and the set constructor to remove duplicates
 */
const buildLabels = function buildLabels(families) {
  return [...new Set(families)];
};

/**
 * Return a list of counts of people with each name.
 */
const buildCounts = function buildCounts(people, names) {
  const counts = [];
  names.forEach((name, nameIndex) => {
    counts[nameIndex] = 0;
    people.forEach((person) => {
      if (person === names[nameIndex]) {
        counts[nameIndex] += 1;
      }
    });
  });
  return counts;
};

/**
 * Display the names and the counts.
 * For debugging.
 */
const displayCounts = function display(names, count) {
  names.forEach((name, index) => {
    console.log('Name: ', name, ', Count', count[index]);
  });
};

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const gotData = data;
    const people = [];
    gotData.forEach((person) => {
      people.push(person.family);
    });
    cleanFamilyNames(people);
    const names = buildLabels(people);
    const counts = buildCounts(people, names);
    displayCounts(names, counts);
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
