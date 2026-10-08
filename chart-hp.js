const grafCores = [
    "#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1", "#FF9DA7", "#9C755F", "#BAB0AC",
    "#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1", "#FF9DA7", "#9C755F", "#BAB0AC",
    "#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1", "#FF9DA7", "#9C755F", "#BAB0AC"
];
const grafCoresSn = ["#76B7B2", "#BAB0AC"];

function GrafBarras(grafCanvas, grafTitulo, grafLabels, grafData, xy) {
    const ctx = document.getElementById(grafCanvas).getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: { labels: grafLabels, datasets: [{ data: grafData, backgroundColor: grafCores }] },
        options: {
            indexAxis: xy,
            scales: {
                y: {
                    ticks: {
                        callback: function (value) {
                            if (xy === "x" && Number.isInteger(value)) return value.toLocaleString("pt-BR");
                            if (xy === "y") return this.getLabelForValue(value);
                        }
                    }
                }
            },
            responsive: true,
            plugins: {
                title: { display: true, text: grafTitulo, font: { size: 18 } },
                legend: { display: false }
            }
        }
    });
}

function GrafPizza(grafCanvas, grafTitulo, grafLabels, grafData) {
    const ctx = document.getElementById(grafCanvas).getContext("2d");
    const cores = grafLabels.length == 2 && grafLabels[0] == "Sim" ? grafCoresSn : grafCores;
    new Chart(ctx, {
        type: "pie",
        data: { labels: grafLabels, datasets: [{ data: grafData, backgroundColor: cores }] },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: grafTitulo, font: { size: 18 } },
                legend: {
                    position: "bottom",
                    labels: {
                        generateLabels: function (chart) {
                            const data = chart.data;
                            const total = data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const percentage = ((value / total) * 100).toFixed(0);
                                return {
                                    text: label + ": " + percentage + "%",
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: data.datasets[0].backgroundColor[i],
                                    lineWidth: 0,
                                    index: i
                                };
                            });
                        }
                    }
                }
            }
        }
    });
}