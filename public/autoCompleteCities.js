const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Hong Kong", "Singapore", "Moscow", "Sydney", "Rio de Janeiro", "Cairo", "Cape Town", "Dubai", "Bangkok", "Berlin", "Beijing", "Toronto", "Mumbai", "Mexico City", "Johannesburg", "Buenos Aires", "Istanbul", "São Paulo", "Lagos", "Jakarta", "Seoul", "Shanghai", "Karachi", "Kuala Lumpur", "Bangkok", "Jakarta", "Delhi", "Lima", "Tehran", "Ankara", "Baghdad", "Alexandria", "Rome", "Madrid", "Vienna", "Athens", "Mexico City", "Montreal", "Vancouver", "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Auckland", "Wellington", "Christchurch", "Cape Town", "Durban", "Pretoria", "Helsinki", "Oslo", "Stockholm", "Copenhagen", "Reykjavik", "Zurich", "Geneva", "Amsterdam", "Brussels", "Prague", "Budapest", "Warsaw", "Dublin", "Lisbon", "Jerusalem", "Tel Aviv", "Haifa", "Beer Sheva", "Ashdod", "Rishon LeZion", "Petah Tikva", "Netanya", "Holon", "Bnei Brak", "Bat Yam", "Ramat Gan", "Ashkelon", "Rehovot", "Herzliya", "Kfar Saba", "Lod", "Nahariya", "Raanana", "Modiin", "Tiberias", "Zefat", "Eilat", "Yavne", "Kiryat Gat", "Kiryat Shmona", "Carmiel", "Afula", "Hadera", "Ariel", "Dimona"];

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
            // item.className = "autocomplete-item";
            option.value = city;
            option.classList = "autocomplete-item";
            // item.addEventListener("click", function() {
            //     // Set the input field with the selected city
            //     document.getElementById("city-search").value = city;
            //     autocompleteList.innerHTML = ""; // Clear the list after selection
            // });
            autocompleteList.appendChild(option);
            console.log(option);
        });
    }
});