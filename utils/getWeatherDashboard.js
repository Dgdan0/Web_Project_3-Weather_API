import axios from "axios";
import Weather from "./Weather.js";
import City from "./City.js";

const apiKey = "6438e532cef6304b313ea1b9fe1351bd";
const API_URL = "https://api.openweathermap.org";

const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Hong Kong", "Singapore", "Moscow", "Sydney", "Rio de Janeiro", "Cairo", "Cape Town", "Dubai", "Bangkok", "Berlin", "Beijing", "Toronto", "Mumbai", "Mexico City", "Johannesburg", "Buenos Aires", "Istanbul", "São Paulo", "Lagos", "Jakarta", "Seoul", "Shanghai", "Karachi", "Kuala Lumpur", "Bangkok", "Jakarta", "Delhi", "Lima", "Tehran", "Ankara", "Baghdad", "Alexandria", "Rome", "Madrid", "Vienna", "Athens", "Mexico City", "Montreal", "Vancouver", "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Auckland", "Wellington", "Christchurch", "Cape Town", "Durban", "Pretoria", "Helsinki", "Oslo", "Stockholm", "Copenhagen", "Reykjavik", "Zurich", "Geneva", "Amsterdam", "Brussels", "Prague", "Budapest", "Warsaw", "Dublin", "Lisbon", "Jerusalem", "Tel Aviv", "Haifa", "Beer Sheva", "Ashdod", "Rishon LeZion", "Petah Tikva", "Netanya", "Holon", "Bnei Brak", "Bat Yam", "Ramat Gan", "Ashkelon", "Rehovot", "Herzliya", "Kfar Saba", "Lod", "Nahariya", "Raanana", "Modiin", "Tiberias", "Zefat", "Eilat", "Yavne", "Kiryat Gat", "Kiryat Shmona", "Carmiel", "Afula", "Hadera", "Ariel", "Dimona"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//? Get X random cities
const getRandomCities = async (randNum) =>{
    let citiesWeather = [];
    const date = new Date();
    const formattedCurrDate = `${date.getMonth()+1}-${date.getDate()}`;

    for(let i=0; i<randNum; i++){
        
        let randCity = cities[Math.floor(Math.random() * cities.length)]
        while (citiesWeather.some(cityWeather => Object.keys(cityWeather)[0] === randCity.name)) {
            randCity = cities[Math.floor(Math.random() * cities.length)];
        }
        let randWeather = await generateWeatherData(randCity,9,formattedCurrDate);
        console.log(randCity);
        console.log(randWeather.dailyWeather)
        citiesWeather.push({[randWeather.cityData.name]: [randWeather.cityData, randWeather.dailyWeather]});
    }
    return citiesWeather;

}


//? Get City data based on the city got from API
const fetchCityData = async (city) => {
    try{
        const response = await axios.get(API_URL+"/geo/1.0/direct?q="+city+"&appid="+apiKey);
        const result = response.data;
        return result;
    } catch(error){
        console.error(error.message);
    }
}

//? Get weather data based on lat and lon coordinates
const fetchWeatherData = async (lat, lon) => {
    try{
        const response = await axios.get(API_URL+"/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid="+apiKey);
        const result = response.data;
        return result;
    } catch(error){
        console.error(error.message);
    }
}


//? Main function to aggregate the data and send to Index.js
const generateWeatherData = async (city, time, date) => {
    let cityData = await fetchCityData(city);
    if(cityData){
        let cityLat = cityData[0].lat, cityLon = cityData[0].lon;
        let cityName = cityData[0].name;
        let weatherData = await fetchWeatherData(cityLat, cityLon);
        if(weatherData){
            let retWeather = {
                fiveWeather:getFiveWeatherData(weatherData, time),
                dailyWeather: getDailyWeatherData(weatherData, date),
                dateOptions: getDateOptions(weatherData),
                cityName: cityName,
                cityData: getCityData(weatherData)
            };


            return retWeather;
        }
        else{return {error:'Weather Error'}}
    }
    else{return {error:'City Error'}}
}


//? Get Five Day Weather
const getWeatherClass = (weatherItem) => {
    let tempDate = new Date(weatherItem.dt_txt);
    let date = `${tempDate.getDate()}/${tempDate.getMonth()+1}`;
    let time = `${tempDate.getHours()}`;
    let dow = days[tempDate.getDay()];
    let tempWeather = new Weather(date, time, dow, weatherItem.main.temp, weatherItem.main.humidity, [weatherItem.weather[0].main,weatherItem.weather[0].description], weatherItem.weather[0].icon, weatherItem.wind.speed, weatherItem.sys.pod);
    return tempWeather;
}

const getFiveWeatherData = (weather, time) => {
    let weatherDailyArr = weather.list;
    if(time.length==1){time='0'+time}
    let useWeather = weatherDailyArr.filter(item => item.dt_txt.split(' ')[1].startsWith(time));
    let retWeather = []; 
    for(let i=0; i<useWeather.length; i++){
        let tempWeather = getWeatherClass(useWeather[i])
        retWeather.push(tempWeather);
    }
    return(retWeather);
}

//? Get Daily Weather
const getFirstWeatherTime = (weather, date) =>{
    for(let i=0; i<weather.list.length; i++){
        console.log(weather.list[i].dt_txt);
        if(weather.list[i].dt_txt.includes(date)){
            return i;
        }
    }
}

//? Get City Data
const getCityData = (weather) =>{
    let wc = weather.city;      // Easier
    let city = new City(wc.name, wc.country, wc.population, wc.sunrise, wc.sunset, wc.timezone);
    console.log(city);
    return city;
}

const getDailyWeatherData = (weather, date) => {
    let timeLength = 8  //FUll day (12 - 9) if u want 12 - 12 use 9
    let index = getFirstWeatherTime(weather, date);
    let retWeather = [];
    if(index+timeLength > weather.list.length){    //! Check that this works later
        index = weather.list.length - timeLength;
        console.log('LESS THEN 24, NEED TO CHANGE INDEX');
    }
    for(let i=index; i<index+timeLength; i++){
        let tempWeather = getWeatherClass(weather.list[i]);
        retWeather.push(tempWeather);
    }
    //* Get Data for options menu 
    return retWeather;
}

const getDateOptions = (weather) => {
    const dateSet = new Set();
    weather.list.forEach((item) => {
        let tempDate = new Date(item.dt_txt);
        let date = `${tempDate.getDate()}/${tempDate.getMonth()+1}`;
        dateSet.add(date);
    })
    return Array.from(dateSet);
}




export {
    generateWeatherData,
    getRandomCities,
};