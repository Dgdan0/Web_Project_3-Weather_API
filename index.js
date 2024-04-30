import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as gwd from "./utils/getWeatherDashboard.js";



const app = express();
const port = 3000;
const apiKey = "6438e532cef6304b313ea1b9fe1351bd";
const API_URL = "https://api.openweathermap.org";


// Middleware //
app.use(express.static("public"));      // Main route will be public
app.use(bodyParser.urlencoded({extended: true}));       // Can use res.body to get json database
app.use(express.json());




// Server //
app.get("/", async (req, res) =>{
    let citiesWeather = await gwd.getRandomCities(4);

    citiesWeather.forEach((weatherObj) => {
        let cityInfo = weatherObj[Object.keys(weatherObj)[0]][0];
        console.log("cities:"+cityInfo.name);
    });
    res.render('index.ejs', {
        citiesWeather,
    });
})

app.post("/submit-city",async (req, res) =>{
    const cityName = req.body.city;
    const time = '9';
    const date = new Date();
    const formattedCurrDate = `${date.getMonth()+1}-${date.getDate()}`;
    let weatherData = await gwd.generateWeatherData(cityName, time, formattedCurrDate);

    if(weatherData.error){
        console.log(weatherError.error);
        res.render('dashboard.ejs', {error:weatherData.error});
    }
    else{
        res.render('dashboard.ejs',{
            cityName: weatherData.cityData.name,
            fiveWeather: weatherData.fiveWeather,
            dailyWeather: weatherData.dailyWeather,
            dateOptions: weatherData. dateOptions,
            dailyFeature: 'temp',
        });
    }
})

app.post("/change-time", async (req, res) =>{
    let time = req.body.time;
    let cityName = req.body.cityName;

    const date = new Date();
    const formattedCurrDate = `${date.getMonth()+1}-${date.getDate()}`;

    let weatherData = await gwd.generateWeatherData(cityName, time, formattedCurrDate);
    if(weatherData.error){
        console.log(weatherError.error);
        res.render('dashboard.ejs', {error:weatherData.error});
    }
    else{
        res.json({
            cityName: weatherData.cityData.name,
            fiveWeather: weatherData.fiveWeather,
        });
    }
})


app.post('/change-date', async (req, res) => {
    let date = req.body.date;
    let formattedDate = date.split('/')
    if(formattedDate[0].length == 1){formattedDate[0]=`0${formattedDate[0]}`}
    if(formattedDate[1].length == 1){formattedDate[1]=`0${formattedDate[1]}`}
    formattedDate = `${formattedDate[1]}-${formattedDate[0]}`
    let selectedFeature = req.body.feature;

    let cityName = req.body.cityName;
    let time= '9';

    let weatherData = await gwd.generateWeatherData(cityName, time, formattedDate);
    if(weatherData.error){
        console.error(weatherError.error);
        res.render('dashboard.ejs', {error:weatherData.error});
    }
    else{
        res.json({
            cityName: weatherData.cityData.name,
            dailyWeather: weatherData.dailyWeather,
            feature: selectedFeature,
        });
    }
})





app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})