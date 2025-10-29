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

        console.log('error');

        console.log(error);

    }

}

function getDayName(index) {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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

    for (let i = 0; i < arr.length; i++) {

        cartona += `<div class="col-lg-4 day-column">
                        <p class="text-secondary mb-1">${getDayName(i)}</p>
                        <p class="text-muted small mb-4">${getDateString(i)}</p>
                        <p class="text-light mb-3">${cityName}</p>
                        <h1 class="display-1 text-white fw-light mb-4">${arr[i].temp_c}°C</h1>
                        <div class="fs-1 mb-3 text-light">
                            <i>
                                <img src="https:${arr[i].condition.icon}" alt="weather icon">
                            </i>
                        </div>
                        <p class="text-info mb-4">Clear</p>
                        <div class="d-flex gap-4 text-secondary">
                            <span><i class="fas fa-tint me-2"></i>${arr[i].humidity}%</span>
                            <span><i class="fas fa-wind me-2"></i>${arr[i].wind_kph}km/h</span>
                            <span><i class="fas fa-compass me-2"></i>${arr[i].wind_dir}</span>
                        </div>
                    </div>
                    <div class="col-lg-4 day-column text-center">
                        <p class="text-secondary mb-1">${getDayName(i)}</p>
                        <p class="text-muted small mb-5">&nbsp;</p>
                        <div class="mb-4" style="height: 40px;"></div>
                        <div class="fs-1 mb-3">
                            <i>
                            <img src="https:${forecastDays[i].day.condition.icon}" alt="weather icon">
                            </i>
                        </div>
                        <h2 class="display-4 text-white fw-light mb-2">${forecastDays[i].day.avgtemp_c}°C</h2>
                        <p class="text-secondary fs-5 mb-3">${forecastDays[i].day.condition.text}</p>
                    </div>
                    <div class="col-lg-4 day-column text-center">
                        <p class="text-secondary mb-1">${getDayName(i)}</p>
                        <p class="text-muted small mb-5">&nbsp;</p>
                        <div class="mb-4" style="height: 40px;"></div>
                        <div class="fs-1 mb-3">
                            <i>
                            <img src="https:${forecastDays[i].day.condition.icon}" alt="weather icon">
                            </i>
                        </div>
                        <h2 class="display-4 text-white fw-light mb-2">${forecastDays[i].day.avgtemp_c}°C</h2>
                        <p class="text-secondary fs-5 mb-3">${forecastDays[i].day.condition.text}</p>
                    </div>`


    }

    document.getElementById('rowData').innerHTML = cartona

}