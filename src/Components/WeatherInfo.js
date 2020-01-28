import React from 'react';
import '../Styles/Weather.css';

function WeatherInfo(props) {
    const { temp, humidity, desc, city, icon } = props.data;
    let url = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <React.Fragment>
            <h2>{desc}</h2><img src={url} />
            <section className="weather-data-flex">
                <div className="header-desc">
                    <h4>City</h4>
                    <p>{city}</p>
                </div>
                <div className="header-desc">
                    <h4>Temperature</h4>
                    <p>{temp}<span className="deg"> F</span></p>
                </div>
                <div className="header-desc">
                    <h4>Humidity</h4>
                    <p>{humidity}%</p>
                </div>
            </section>

        </React.Fragment>
    );
}

export default WeatherInfo;