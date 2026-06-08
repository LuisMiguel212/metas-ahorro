let distributionChart = null;
let progressChart = null;

function renderCharts() {

    renderDistributionChart();

    renderProgressChart();

}

function renderDistributionChart() {

    const ctx =
    document
    .getElementById(
        "distributionChart"
    );

    if (!ctx) return;

    if (distributionChart) {
        distributionChart.destroy();
    }

    const labels =
    goals.map(
        goal => goal.name
    );

    const values =
    goals.map(
        goal => goal.saved
    );

    distributionChart =
    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels,

            datasets: [{

                data: values,

                backgroundColor: [

                    "#c0392b",
                    "#e74c3c",
                    "#ff7675",
                    "#fab1a0",
                    "#d63031",
                    "#fd79a8",
                    "#e17055",
                    "#ff6b6b"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

function renderProgressChart() {

    const ctx =
    document
    .getElementById(
        "progressChart"
    );

    if (!ctx) return;

    if (progressChart) {
        progressChart.destroy();
    }

    const labels =
    goals.map(
        goal => goal.name
    );

    const progress =
    goals.map(goal =>

        Number(
            (
                goal.saved /
                goal.target *
                100
            ).toFixed(1)
        )

    );

    progressChart =
    new Chart(ctx, {

        type: "bar",

        data: {

            labels,

            datasets: [{

                label:
                "Porcentaje de avance",

                data: progress

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

                }

            }

        }

    });

}
