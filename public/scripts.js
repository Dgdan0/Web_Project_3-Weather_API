import { createGraph } from '/createGraph.js';


// Show One-Day Data on the right side
document.querySelectorAll('.one-day').forEach( (element) => {
    element.addEventListener('click', () => {
        let weatherData = JSON.parse(document.getElementById('weatherData').dataset.weather);

        let index = parseInt((element.className.split(' '))[1].split('-')[2]);
        console.log(index);
        let dayWeatherData = weatherData[index];
        console.log(dayWeatherData);

        document.getElementById('right-side').innerHTML = `
        <div class="right-date">
            <p>${dayWeatherData.date}</p>
            <p class="right-dow">${dayWeatherData.dow}
        </div>
        <div class="right-icon">
            <img src="https://openweathermap.org/img/wn/${dayWeatherData.icon}@2x.png" alt="Weather icon">
            <p>${dayWeatherData.weather_type[1]}</p>
        </div>
        <div class="right-info">
            <div class="info-container">
                <i class="fa-solid fa-temperature-half"></i>
                <p>Temperature: <span class="info">${dayWeatherData.temp}</span><span class="unit">&deg;</span></p>
            </div> 
            <div class="info-container">
                <i class="fa-solid fa-droplet"></i>
                <p>Humidity: <span class="info">${dayWeatherData.humidity}</span><span class="unit">%</span></p>
            </div> 
            <div class="info-container">
                <i class="fa-solid fa-wind"></i>
                <p>wind: <span class="info">${dayWeatherData.wind}</span><span class="unit">km/h</span></p>

            </div> 
        </div>
        `
    })
})

// Change Five Day forecast dashboard data based on selected time
const changeFiveDashboard = (fiveWeather) =>{
    //Time Change
    let dailyTimeElement = document.querySelector('#daily-time');
    dailyTimeElement.textContent = 'forecast for ' + fiveWeather[0].time;
    for(let i=0; i<fiveWeather.length; i++){
        //Image Change
        let dailyContainer = document.querySelector('.one-day-'+i);
        let dailyIconElement = dailyContainer.querySelector('.one-day-icon').querySelector('img');
        dailyIconElement.setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveWeather[i].icon + '@2x.png');
        //Day Change (if it took time between requests the day should change)
        let dailyDowElement = dailyContainer.querySelector('.one-day-dow').querySelector('p');
        dailyDowElement.textContent = fiveWeather[i].dow;
        //Temp Change
        let dailyTempElement = dailyContainer.querySelector('.one-day-temp').querySelector('span');
        dailyTempElement.textContent = `${fiveWeather[i].temp}`;
    }
    // Update Right Window
    if(document.querySelector('.right-date')){      // There is data on the right side (so we want to update it)
        let oldWeatherData = JSON.parse(document.getElementById('weatherData').dataset.weather);
        let oldDate = document.querySelector('.right-date').querySelector('p');
        let index;
        for(let i=0; i<oldWeatherData.length; i++){
            if(oldDate.textContent == oldWeatherData[i].date){
                index = i;
            }
        }
        // Date Change
        oldDate.textContent = `${fiveWeather[index].date}`;
        // DOW Change
        let oldDowElement = document.querySelector('.right-dow');
        oldDowElement.textContent = `${fiveWeather[index].dow}`;
        // Icon Change
        let oldIconElement = document.querySelector('.right-icon').querySelector('img');
        oldIconElement.setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveWeather[index].icon + '@2x.png');
        // WeatherDesc Change
        let oldWeatherElement = document.querySelector('.right-icon').querySelector('p');
        oldWeatherElement.textContent = `${fiveWeather[index].weather_type[1]}`
        // Temp Change
        let oldTempElement = document.querySelectorAll('.info-container')[0].querySelector('span');
        oldTempElement.textContent = `${fiveWeather[index].temp}`
        // Hum Change
        let oldHumElement = document.querySelectorAll('.info-container')[1].querySelector('span');
        oldHumElement.textContent = `${fiveWeather[index].humidity}`
        // Wind Change
        let oldWindElement = document.querySelectorAll('.info-container')[2].querySelector('span');
        oldWindElement.textContent = `${fiveWeather[index].wind}`
    }


    //Data Change
    let dataElement = document.querySelector('#weatherData');
    dataElement.setAttribute('data-weather', JSON.stringify(fiveWeather));
}

// get data based on selected time
document.getElementById('forecast-time').addEventListener('change', async (event) =>{
    let selectedTime = event.target.value;
    let cityName = document.getElementById('main-title').textContent.split(' ').slice(2).join(' ');
    
    try{
        let response = await fetch('/change-time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({time: selectedTime, cityName})
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        changeFiveDashboard(data.fiveWeather);
    } catch(error){
        console.error('Error:', error);
    }
})

// One Day click effect mouse down (click)
document.querySelectorAll('.one-day').forEach((element) => {
    element.addEventListener('mousedown', () => {
        element.classList.add('clicked');
    })
})

// One Day click effect mouse up (unclick)
document.addEventListener('mouseup', () => {
    document.querySelectorAll('.clicked').forEach((element) => {
        element.classList.remove('clicked');
    }) 
})


// 

const changeDailyDashboard = (dailyWeather, feature) => {
    const weatherDataDiv = document.getElementById('dailyWeatherData');
    weatherDataDiv.setAttribute('daily-data-weather', JSON.stringify(dailyWeather));
    createGraph(feature);
}

document.getElementById('daily-date').addEventListener('change', async (event) =>{
    let selectedDate = event.target.value;
    let cityName = document.getElementById('main-title').textContent.split(' ').slice(2).join(' ');
    let feature = document.querySelector('.button-clicked').value
    console.log('Feature: '+feature);
    try{
        let response = await fetch('/change-date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: selectedDate, cityName, feature})
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        changeDailyDashboard(data.dailyWeather, data.feature);

        //Change forecast date showin
        let dateElement = document.querySelector('#daily-title-text').querySelector('h3');
        dateElement.textContent = `for the ${data.dailyWeather[0].date}`;

    } catch(error){
        console.error('Error:', error);
    }
})


// Daily Info Change
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelector('#daily-info-buttons').querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('button-clicked');
            });
            button.classList.add('button-clicked');

            const feature = button.value;
            createGraph(feature);

        });
    });
});

