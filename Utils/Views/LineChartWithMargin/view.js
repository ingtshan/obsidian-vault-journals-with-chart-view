const pages = window.pages.filter(p => p[input.key] != undefined)
const data = pages[input.key].array()
const mags = data.map((e, index) => [0, index == 0 ? 0 : e - data[index - 1]])

const chartData = {
    type: 'line',
    data: {
        labels: pages.date.values.map(e =>`${e.month}/${e.day}`),
        datasets: [
            {
                yAxisID: 'A',
                type: 'line',
                label: input.label,
                data: data,
                pointBackgroundColor: '#6c40d6',
                borderColor: '#6c40d65c',
                tension: 0.4,
                spanGaps: true,
            },
            {
                yAxisID: 'B',
                type: 'bar',
                label: 'Margin',
                data: mags,
                backgroundColor: ['rgb(255, 206, 86, 0.1)'],
                borderColor: ['rgb(255, 206, 86)'],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            A: {
                type: 'linear',
                position: 'left',
                max: input.max,
                min: input.min,
            },
            B: {
                type: 'linear',
                position: 'right',
                max: input.margin,
                min: -1 * input.margin,
            }
        }
    }
}

window.renderChart(chartData, dv.container);
