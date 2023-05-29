let pages = window.pages
    .filter(p => p.date.day != undefined)
    .filter(p => p.bedTimeStart != undefined)
    .sort(p => p.date);

if (input.range) pages = pages.slice(input.range * -1);

const bedTimeStart = pages.bedTimeStart;
const bedTimeStop = pages.bedTimeStop;

// map 1 ~ 11 to -1 ~ -11, 13 ~ 23 to 11 ~ 1
const clockMapping = function (hour, minute) {
  const h = (hour * 60 + minute) / 60
  return (h >= 12 ? 24 : 0) - h
}

const bedTimeStartStopNumber = bedTimeStart.values.map((value, index) => {
    const start = clockMapping(
      parseInt(value.split(':')[0]),
      parseInt(value.split(':')[1])
    )
    const end = clockMapping(
      parseInt(bedTimeStop.values[index].split(':')[0]),
      parseInt(bedTimeStop.values[index].split(':')[1])
    )
    return [start, end];
});

const sleepTime = bedTimeStartStopNumber.map((v) => v[0] - v[1]);

const sleepRatings = bedTimeStartStopNumber.map((v, index) => {
  let score = 7
  score += v[0] > 1 ? 1 : v[0]
  return score * (sleepTime[index] / 8)
})

const chartData = {
    beginAtZero: true,

    data: {
        labels: pages.date.values.map(e => `${e.month}/${e.day}`),
        datasets: [
            {
                yAxisID: 'B',
                type: 'line',
                label: 'Go To Bed At',
                data: bedTimeStartStopNumber.map((v) => v[0]),
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1,
            },
            {
                yAxisID: 'A',
                type: 'line',
                label: 'Sleep Duration',
                data: sleepTime,
                borderColor: ['rgb(54, 162, 235)'],
                borderWidth: 1,
            },
            {
                yAxisID: 'A',
                type: 'line',
                label: 'Sleep Rating',
                data: sleepRatings,
                borderColor: ['rgb(255, 206, 86)'],
                borderWidth: 1,
            },
            {
                yAxisID: 'B',
                type: 'bar',
                label: 'Sleep',
                data: bedTimeStartStopNumber,
                backgroundColor: ['rgb(153, 102, 255, 0.2)'],
                borderColor: ['rgb(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    },
    options: {
        tooltips: {
            callbacks: {
                label: function (t, d) {
                    return 'FFFF';
                },
            },
        },
        scales: {
            A: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                min: 0,
            },
            B: {
                type: 'linear',
                position: 'right',
                max: 5,
                min: -11,

                ticks: {
                    fontSize: 40,
                    count: 17,
                    maxTicksLimit: 20,
                    callback: function (value) {
                        // map -11 ~ 5 to 11:00~0:00, 23:00~19:00
                        return `${value < 0 ? -1 * value : 24 - value}:00`;
                    },
                },
            },
            // x: {
            //     ticks: {
            //         maxRotation: 90,
            //         minRotation: 90,
            //     },
            // },
        },
    },
};

input.func(chartData, dv.container);
