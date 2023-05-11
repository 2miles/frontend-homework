import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { backgroundColors, borderColors } from '../utils/chartColors';
import { cleanNames, removeDupes, buildCountList } from '../utils/housesUtils';

const url = 'https://thronesapi.com/api/v2/Characters';

export default function Houses() {
  const [doughnutData, setDoughnutData] = useState({});

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const families = [];
        data.forEach((d) => {
          families.push(d.family);
        });
        const houseNames = cleanNames(families);
        const houseNameLabels = removeDupes(houseNames);
        const houseNameCounts = buildCountList(houseNames, houseNameLabels);
        setDoughnutData({
          labels: houseNameLabels,
          datasets: [
            {
              // label: houseNameLabels,
              data: houseNameCounts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        });
      })
      /* eslint-disable no-console */
      .catch((err) => console.log(err));
  }, []);

  if (Object.keys(doughnutData).length === 0)
    return (
      <div className="container">
        <h1>Houses</h1>
      </div>
    );
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
