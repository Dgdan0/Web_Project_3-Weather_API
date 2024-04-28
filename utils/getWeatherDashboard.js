import axios from "axios";
import Weather from "./Weather.js";


const apiKey = "6438e532cef6304b313ea1b9fe1351bd";
const API_URL = "https://api.openweathermap.org";

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const fetchCityData = async (city) => {
    try{
        const response = await axios.get(API_URL+"/geo/1.0/direct?q="+city+"&appid="+apiKey);
        const result = response.data;
        return result;
    } catch(error){
        console.error(error.message);
    }
}

const getchWeatherData = async (lat, lon) => {
    try{
        const response = await axios.get(API_URL+"/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid="+apiKey);
        const result = response.data;
        return result;
    } catch(error){
        console.error(error.message);
    }
}

const generateWeatherData = async (city, time) => {
    let cityData = await fetchCityData(city);
    if(cityData){
        let cityLat = cityData[0].lat, cityLon = cityData[0].lon;
        let cityName = cityData[0].name;
        console.log("City Info:\n  Lontitude: "+cityLon+"\n  Latitude: "+cityLat);
        let weatherData = await getchWeatherData(cityLat, cityLon);
        if(weatherData){
            let retWeather = {
                fiveWeather:getFiveWeatherData(weatherData, time),
                cityName: cityName
            };
            return retWeather;
        }
        else{return {error:'Weather Error'}}
    }
    else{return {error:'City Error'}}
}


const getFiveWeatherData = (weather, time) => {
    let weatherDailyArr = weather.list;
    console.log(time);
    if(time.length==1){time='0'+time}
    let useWeather = weatherDailyArr.filter(item => item.dt_txt.split(' ')[1].startsWith(time));
    let showWeather = []; 
    for(let i=0; i<useWeather.length; i++){
        let cw = useWeather[i];         //Current Weather (save space)
        let tempDate = new Date(cw.dt_txt);
        let date = `${tempDate.getDate()}/${tempDate.getMonth()+1}`;
        let time = `${tempDate.getHours()}`;
        let dow = days[tempDate.getDay()];
        let tempWeather = new Weather(date, time, dow, cw.main.temp, cw.main.humidity, [cw.weather[0].main,cw.weather[0].description], cw.weather[0].icon, cw.wind.speed, cw.sys.pod);
        showWeather.push(tempWeather);
    }
    return(showWeather);
}


export {
    generateWeatherData,
};