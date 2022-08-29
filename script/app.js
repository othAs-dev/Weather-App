if (window.location.protocol == "https:") {
  console.log("You are not connected with the correct protocol.");
  console.log("Reloading the page to the correct protocol...");
  window.location = document.URL.replace("https://", "http://");
}

if (window.location.protocol == "http:") {
  console.log("You are connected with the correct protocol.");
}
let form = document.querySelector("form");
let valueInput = document.getElementById("valueInput");
let result = document.getElementById("result");
let locations = document.getElementById("locations");
let dates = document.getElementById("date");
let temp = document.getElementById("temp");
let more = document.getElementById("more");
let today = new Date();
let city = "";
let meteo = [];
const apiKey = "2ae39263c6b6ddd5740f0aaa85f38ac5";
const fetchMeteo = async () => {
  const apiURI = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
  meteo = await fetch(apiURI).then((response) => response.json());
  console.log(meteo);
};
const displayMeteo = async () => {
  await fetchMeteo();
  let farenheit = Math.trunc(meteo.current.temperature * 1.8 + 32);
  locations.innerHTML = `<h2>${meteo.location.name}, ${meteo.location.country}`;
  dates.innerHTML = today;
  more.innerHTML = `<p>Humidité : ${meteo.current.humidity} | Index UV :  ${meteo.current.uv_index} | Visibilité : ${meteo.current.visibility}`;
  temp.innerHTML = `<h1>${meteo.current.temperature}&deg;C | ${farenheit} &deg;F</h1>`;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = valueInput.value;
  if (city.length > 2) {
    displayMeteo();
  } else {
    result.innerHTML = `   
     <div class="alert alert-danger w-75 text-center mx-auto mt-3" role="alert">
      Veuillez saisir une ville
    </div>;`;
  }
});
