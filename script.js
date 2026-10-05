const defaultState = document.getElementById('defaultState');
const loadingState = document.getElementById('loadingState');
const weatherState = document.getElementById('weatherState');
const checkWeatherBtn = document.getElementById('searchBtn'); 
const inputField = document.getElementById('city');
const date = document.getElementById('date');
const Name = document.getElementById('cityName');
const weatherIcon = document.getElementById('weather-icon');
const tempValue = document.getElementById('temp-value');
const type = document.getElementById('type-info');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const typeIcon = document.getElementById('typeIcon');
const newSearch = document.getElementById('newSearch');
//-----------------------------------------------------
const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: 'short', 
    day: 'numeric',   
    month: 'short'    
});


const apiKey = 'fda1de418a505ef8d2d4934d4d91db6f';


loadingState.classList.add('hidden');
weatherState.classList.add('hidden');
newSearch.classList.add('hidden');

checkWeatherBtn.addEventListener('click', checkWeather);



async function checkWeather() {
    defaultState.classList.add('hidden');
    loadingState.classList.remove('hidden'); 

    const cityName = inputField.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    setTimeout(() => {
        loadingState.classList.add('hidden');
        weatherState.classList.remove('hidden');
        newSearch.classList.remove('hidden');
    }, 2300); 
    const response = await fetch(url);
    const data = await response.json();

//------------test---------------------------------------
                                                      //|
    console.log(`weather : ${data.weather[0].main}`); //|
     console.log(`temperature: ${data.main.temp}`);   //|
    console.log(data)                                 //|
                                                     //|
//-------------------------------------------------------
const weatherCondition = data.weather[0].main;
const iconCode = data.weather[0].icon; 
let iconUrl = "";

if (weatherCondition === "Clear") {
    if (iconCode.includes("n")) {
        iconUrl ="https://cdn-icons-png.flaticon.com/128/17798/17798728.png"; 
    } else {
        iconUrl = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"; 
    }
} else if (weatherCondition === "Clouds") {
         if (iconCode.includes("n")) {
        iconUrl ="https://cdn-icons-png.flaticon.com/128/5146/5146187.png";
            }else {
        iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; 
        }
 } else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
    iconUrl = "https://cdn-icons-png.flaticon.com/128/2469/2469994.png"; 
} else if (weatherCondition === "Thunderstorm") {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/3313/3313888.png"; 
} else if (weatherCondition === "Snow") {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/2315/2315309.png"; 
} else {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; 
}

weatherIcon.src = iconUrl;
date.innerText = formattedDate;
Name.innerText = data.name;
weatherIcon.src = iconUrl;
tempValue.innerText = `${data.main.temp} °C`;
type.innerText = data.weather[0].main;

humidity.innerText = `${data.main.humidity} %`;
windSpeed.innerText = `${data.wind.speed} km/h`;
if (weatherCondition === "Clear") {
   
    if (data.weather[0].icon.includes("n")) {
        typeIcon.className = "fa-solid fa-moon";
    } else {
        typeIcon.className = "fa-solid fa-sun";
    }
} 
else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
    typeIcon.className = "fa-solid fa-cloud-rain";
} 
else if (weatherCondition === "Clouds") {
    typeIcon.className = "fa-solid fa-cloud";
} 
else if (weatherCondition === "Thunderstorm") {
    typeIcon.className = "fa-solid fa-cloud-bolt";
} 
else if (weatherCondition === "Snow") {
    typeIcon.className = "fa-solid fa-snowflake";
} 
else {
    typeIcon.className = "fa-solid fa-smog"; 
}

}
newSearch.addEventListener('click', function(){
    window.location.reload();
});