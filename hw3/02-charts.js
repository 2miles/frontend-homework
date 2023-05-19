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
 * from an array.
 */
const removeDupes = function removeDupes(arr) {
  return [...new Set(arr)];
};

/**
 * Returns an array of family names with typos removed and everyone who is not
 * in a house has house name changed to 'No House'.
 * This function works by first making sure that every house family member name
 * starts with 'House ' and is spelled correctly, then removes any family names
 * that don't start with house and sorts the remaining alphabetically.
 */
const cleanNames = function cleanNames(data) {
  const result = [];
  data.forEach((name) => {
    let goodName = name;
    if (name.includes('Targar')) {
      goodName = 'House Targaryen';
    } else if (name.includes('Lan')) {
      goodName = 'House Lannister';
    } else if (name.includes('Stark')) {
      goodName = 'House Stark';
    } else if (name.includes('Bara')) {
      goodName = 'House Baratheon';
    } else if (name.includes('Grey')) {
      goodName = 'House Greyjoy';
    } else if (name.includes('Tyrell')) {
      goodName = 'House Tyrell';
    } else if (!name.includes('House')) {
      goodName = 'No House';
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

let chartLabels = [];
let counts = [];

const renderChart = () => {
  const donutChart = document.querySelector('.donut-chart');
  // eslint-disable-next-line no-new, no-undef
  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: chartLabels,
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

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('ERROR MESSAGE: ', error);
  }
  return null;
}

async function buildChartData() {
  const families = [];
  const data = await fetchData();
  data.forEach((d) => {
    families.push(d.family);
  });
  const houseNames = cleanNames(families);
  chartLabels = removeDupes(houseNames);
  counts = buildCountList(houseNames, chartLabels);
}

buildChartData().then(renderChart);
