import React from 'react';
import '../Styles/App.css';
import WeatherContainer from './WeatherContainer';
require('dotenv').config();



function App() {
  return (
    <section className="app-container">
      <WeatherContainer />
    </section >
  );
}

export default App;
