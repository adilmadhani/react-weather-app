import React, { useState } from 'react';
import '../Styles/Weather.css';
import WeatherInfo from './WeatherInfo';


function WeatherContainer() {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState({
        temp: null,
        humidity: null,
        desc: null,
        city: null,
        icon: null
    });;
    const [isValidZip, setIsValidZip] = useState(true);

    function updateSearchQuery(e) {
        let zipCode = e.target.value;
        let isValid = validateZipCode(zipCode);
        setSearchQuery(zipCode);

        if (isValid || zipCode === '' || isValid.maxLength === 5) {
            setSearchQuery(zipCode);
            setIsValidZip(true);
        } else {
            setIsValidZip(false);
        }
    }

    function validateZipCode(zipCode) {
        let regex = /[0-9]{5}/;
        return regex.test(zipCode);
    }

    function getWeatherData() {
        if (!isValidZip || searchQuery === '') {
            setIsValidZip(false);
            return;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(data => setWeatherData({
                temp: convertToFarenheit(data.main.temp),
                humidity: data.main.humidity,
                desc: data.weather[0].main,
                city: data.name,
                icon: data.weather[0].icon
            }));
    }

    function convertToFarenheit(temp) {
        return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
    }

    return (
        <section className="weather-container">
            <header className="weather-header">
                <h3>Weathering Today<i className="material-icons">wb_sunny</i></h3>
                <div>
                    <input placeholder="Zip Code" className="search-input" onChange={updateSearchQuery} maxLength='5' />
                    <button className="material-icons" onClick={getWeatherData}>search</button>
                </div>
            </header>
            <p className="error">{isValidZip ? '' : 'Invalid Zip Code'}</p>
            <section className="weather-info">
                {weatherData.temp === null ? (
                    <p>No Weather to Display<i className="material-icons">wb_sunny</i></p>
                ) : <WeatherInfo data={weatherData} />
                }
            </section>
        </section>
    )
}


export default WeatherContainer;