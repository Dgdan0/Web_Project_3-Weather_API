window.myChart = null;


const createGraph = (feature) => {
    
    if (window.myChart) {
        console.log('There is a chart');
        window.myChart.destroy();
    }


    let canvas = document.getElementById('myChart');
    let rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
    
    let dailyWeatherData = JSON.parse(document.getElementById('dailyWeatherData').getAttribute('daily-data-weather'));

    console.log(feature)
    console.log(dailyWeatherData)

    let dates = dailyWeatherData.map(data => `${data.date} ${data.time}:00`);
    let featureData = dailyWeatherData.map(data => data[feature]);

    let ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: feature.charAt(0).toUpperCase() + feature.slice(1), // Capitalize the first letter of the feature
                data: featureData,
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
            }]
        },
        options:{
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 1)' // this will set the color of the labels on the x-axis
                    }
                },
                y: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 1)' // this will set the color of the labels on the y-axis
                    }
                }
            },
            layout:{
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            },
            plugins: {
                title: {
                    display: false,
                    text: 'Chart Title',
                    color: 'rgba(255, 255, 255, 1)' // this will set the color of the title
                },
                legend: {
                    display: false,
                }
            }
        },

    });
}

// Call the function with the feature you want to display
export {
    createGraph,
};