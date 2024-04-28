export default class Weather{
    constructor(date, time, dow, temp, humidity, weather_type, icon, wind, dn){
        this.date = date;
        this.time = time;
        this.dow = dow;
        this.temp = Math.round(temp);
        this.humidity = humidity;
        this.weather_type = weather_type;
        this.icon = icon;
        this.wind = wind;
        this.dn = dn;
    }
}
