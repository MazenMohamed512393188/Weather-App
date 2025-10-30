let search = document.getElementById('search')

let submit = document.getElementById('submit')

submit.addEventListener('click', function () {

    getWeather(search.value)

})

search.addEventListener('input', function () {

    let value = search.value

    getWeather(value)

})

async function getWeather(city) {

    try {

        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c4055e9be0ca4730a6c104454252910&q=${city}&days=7`)

        let data = await response.json()

        let allWeather = []

        allWeather.push(data.current)

        let cityName = data.location.name

        let forecastDays = data.forecast.forecastday

        displayData(allWeather, cityName, forecastDays)

    } catch (error) {

        console.log(`Error fetching weather data for city "${city}":`, error);

        console.log(error);

    }

}

function getDayName(index) {

    let days = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday']

    return days[index % 7]

}
function getDateString(index) {

    let today = new Date()

    today.setDate(today.getDate() + index)

    let options = { day: 'numeric', month: 'long' }

    return today.toLocaleDateString('en-US', options)

}
function displayData(arr, cityName, forecastDays) {

    let cartona = "";

    let daysToShow = Math.min(3, forecastDays.length);

    for (let i = 0; i < daysToShow; i++) {

        if (i === 0) {
            cartona += `<div class="col-lg-4 day-column">
                            <p class="text-secondary mb-1">${getDayName(i)}</p>
                            <p class="text-muted small mb-4">${getDateString(i)}</p>
                            <p class="text-light mb-3">${cityName}</p>
                            <h1 class="display-1 text-white fw-light mb-4">${arr[0].temp_c}°C</h1>
                            <div class="fs-1 mb-3 text-light">
                                <i>
                                    <img src="https:${arr[0].condition.icon}" alt="weather icon">
                                </i>
                            </div>
                            <p class="text-info mb-4">${arr[0].condition.text}</p>
                            <div class="d-flex gap-4 text-secondary">
                                <span><i class="fas fa-tint me-2"></i>${arr[0].humidity}%</span>
                                <span><i class="fas fa-wind me-2"></i>${arr[0].wind_kph}km/h</span>
                                <span><i class="fas fa-compass me-2"></i>${arr[0].wind_dir}</span>
                            </div>
                        </div>`;
        } else if (forecastDays[i] && forecastDays[i].day && forecastDays[i].day.condition) {
            // For other days, use forecast data if available
            cartona += `<div class="col-lg-4 day-column text-center">
                            <p class="text-secondary mb-1">${getDayName(i)}</p>
                            <p class="text-muted small mb-5">${getDateString(i)}</p>
                            <div class="mb-4" style="height: 40px;"></div>
                            <div class="fs-1 mb-3">
                                <i>
                                <img src="https:${forecastDays[i].day.condition.icon}" alt="weather icon">
                                </i>
                            </div>
                            <h2 class="display-4 text-white fw-light mb-2">${forecastDays[i].day.avgtemp_c}°C</h2>
                            <p class="text-secondary fs-5 mb-3">${forecastDays[i].day.condition.text}</p>
                        </div>`;
        }

    }

    document.getElementById('rowData').innerHTML = cartona

}