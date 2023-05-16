import 'chart.js/auto';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { backgroundColors, borderColors } from '../utils/chartColors';
import { cleanNames, removeDupes, buildCountList } from '../utils/housesUtils';

const url = 'https://thronesapi.com/api/v2/Characters';

export default function Houses() {
  const { data: characters, isPending, error } = useFetch(url);
  const [doughnutData, setDoughnutData] = useState({});

  useEffect(() => {
    const families = [];
    characters.forEach((d) => {
      families.push(d.family);
    });
    const houseNames = cleanNames(families);
    const houseNameLabels = removeDupes(houseNames);
    const houseNameCounts = buildCountList(houseNames, houseNameLabels);
    setDoughnutData({
      labels: houseNameLabels,
      datasets: [
        {
          data: houseNameCounts,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    });
  }, [characters]);

  if (isPending) {
    return <h2>Loading Data...</h2>;
  }
  if (error) {
    return (
      <div>
        <h2>Error Loading Data</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Houses</h1>
      <Doughnut
        className="bg-light p-4 border"
        id="doughnut"
        data={doughnutData}
      />
    </div>
  );
}
