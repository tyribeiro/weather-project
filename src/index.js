let apiKey = "076895ce3d9012a52e5a38068e2dba1d";

function getInfoCity(event) {
	event.preventDefault();

	let city = document.getElementById("search-bar").value;
	let h2 = document.querySelector("h2");
	h2.innerHTML = `Weather in ${city}`;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(changeInfo);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getInfoCity);

function getInfoLocation(event) {
	event.preventDefault();

	navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#CurrentButton");
currentButton.addEventListener("click", getInfoLocation);

function getPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(changeInfo);
}

function changeInfo(response) {
	console.log(response);

	let h2 = document.querySelector("h2");
	let city = response.data.name;
	h2.innerHTML = `Weather in ${city}`;

	let temperature = Math.round(response.data.main.temp);
	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;

	let h1 = document.querySelector("h1");
	let humidityInfo = document.getElementById("humidity");
	let windInfo = document.getElementById("wind");

	h1.innerHTML = `${temperature}°C`;
	humidityInfo.innerHTML = `Humidity: ${humidity}%`;
	windInfo.innerHTML = `Wind Speed: ${wind} km/h`;
}
