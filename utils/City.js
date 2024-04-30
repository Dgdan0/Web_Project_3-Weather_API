export default class City{
    constructor(name, country, population, sunrise, sunset, timezone){
        this.name = name;
        this.country = country;
        this.population = population;

        
        let riseDate = new Date(sunrise*1000);
        var hours = riseDate.getHours();
        var minutes = "0" + riseDate.getMinutes();
        var formattedRise = hours + ':' + minutes.substr(-2);
        this.sunrise = formattedRise;

        let setDate = new Date(sunset*1000);
        var hours = setDate.getHours();
        var minutes = "0" + setDate.getMinutes();
        var formattedSet = hours + ':' + minutes.substr(-2);
        this.sunset = formattedSet;
    }
}
