const cities = [    "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Mumbai", "Beijing", "Dhaka", "Osaka", "New York City", "Karachi", "Buenos Aires", "Chongqing", "Istanbul", "Kolkata", "Manila", "Lagos", "Rio de Janeiro", "Tianjin", "Kinshasa", "Guangzhou", "Los Angeles", "Moscow", "Shenzhen", "Lahore", "Bangalore", "Paris", "Bogotá", "Jakarta", "Chennai", "Lima", "Bangkok", "Seoul", "Nagoya", "Hyderabad", "London", "Tehran", "Chicago", "Chengdu", "Nanjing", "Wuhan", "Ho Chi Minh City", "Luanda", "Ahmedabad", "Kuala Lumpur", "Xi'an", "Hong Kong", "Dongguan", "Hangzhou", "Foshan", "Shenyang", "Riyadh", "Baghdad", "Santiago", "Surat", "Madrid", "Suzhou", "Pune", "Harbin", "Houston", "Dallas", "Toronto", "Dar es Salaam", "Miami", "Belo Horizonte", "Singapore", "Philadelphia", "Atlanta", "Fukuoka", "Khartoum", "Barcelona", "Johannesburg", "Saint Petersburg", "Qingdao", "Dalian", "Washington, D.C.", "Yangon", "Alexandria", "Jinan", "Guadalajara", "Boston", "Hanoi", "Chittagong", "London", "Porto Alegre", "Rome", "Cape Town", "Taipei", "Bandung", "Mexico City", "Tianjin", "Montreal", "Kunming", "Berlin", "Algiers", "Havana", "Nairobi", "Bekasi", "Zhangzhou", "Zhengzhou", "Phoenix", "Brisbane", "Linzhou", "Perth", "San Diego", "Makassar", "Milan", "Kathmandu", "Minsk", "Budapest", "Warsaw", "Lusaka", "Colorado Springs", "Oslo", "Brasília", "Stockholm", "Helsinki", "Lisbon", "Novosibirsk", "Urumqi", "Vienna", "Zurich", "Mosul", "Mecca", "Munich", "Nantes", "Sofia", "Abidjan", "Monterrey", "Birmingham", "Cologne", "Auckland", "Nicaragua", "Edmonton", "Turin", "Tashkent", "Asunción", "Leipzig", "Stuttgart", "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Bnei Brak", "Holon", "Ramat Gan", "Ashkelon", "Bat Yam", "Rehovot", "Herzliya", "Kfar Saba", "Hadera", "Modiin-Maccabim-Re'ut", "Nazareth", "Raanana", "Bet Shemesh", "Lod", "Ramat HaSharon", "Afula", "Kiryat Ata", "Nahariya", "Givatayim", "Kiryat Gat", "Eilat", "Hod HaSharon", "Umm al-Fahm"]

document.getElementById("city-search").addEventListener("input", function() {
    const input = this.value.toLowerCase();
    const autocompleteList = document.getElementById("autocomplete-list");

    // Clear previous suggestions
    autocompleteList.innerHTML = "";

    if (input) {
        // Filter cities that match the input
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(input));
        // Create dropdown suggestions
        filteredCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.classList = "autocomplete-item";
            autocompleteList.appendChild(option);
            console.log(option);
        });
    }
});