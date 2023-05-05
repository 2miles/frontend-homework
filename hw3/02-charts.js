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
const removeDupes = function removeDupes(arr) {
  return [...new Set(arr)];
};

/**
 * Returns an array without typos and everyone who is not in a house removed.
 */
const cleanNames = function cleanNames(data) {
  const result = [];
  data.forEach((name) => {
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
    result.push(goodName);
  });
  return result.filter((name) => name.includes('House')).sort();
};

/**
 * Return a array of counts of people in each house.
 */
const buildCountList = function buildCountList(people, houses) {
  const counts = [];
  houses.forEach((houseName, index) => {
    counts[index] = 0;
    people.forEach((name) => {
      if (name === houseName) {
        counts[index] += 1;
      }
    });
  });
  return counts;
};

let houseNameLabels = [];
let houseNameCounts = [];

const renderChart = () => {
  const donutChart = document.querySelector('.donut-chart');
  // eslint-disable-next-line no-new, no-undef
  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: houseNameLabels,
      datasets: [
        {
          label: 'My First Dataset',
          data: houseNameCounts,
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
    const families = [];
    data.forEach((d) => {
      families.push(d.family);
    });
    const houseNames = cleanNames(families);
    houseNameLabels = removeDupes(houseNames);
    houseNameCounts = buildCountList(houseNames, houseNameLabels);
  })
  .then(renderChart)
  /* eslint-disable no-console */
  .catch((err) => console.log(err));
