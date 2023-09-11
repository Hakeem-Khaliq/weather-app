import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State to store weather data and user input for location
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // Constructing the API URL using the OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9a0cec36783c3b0a47e9bba52a87350d`;

  // Function to search for location and fetch weather data when Enter key is pressed
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      // Sending a GET request to the API and handling the response
      axios.get(url).then((response) => {
        setData(response.data); // Storing fetched weather data in the state
        console.log(response.data); // Logging the response data to the console
      });
      setLocation(''); // Clearing the input field
    }
  };

  return (
    <div className="app">
      <div className="search">
        {/* Input field for user to enter location */}
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {/* Displaying the name of the location */}
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* Displaying the temperature in Fahrenheit */}
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {/* Displaying the weather description */}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Rendering additional weather details if a location is selected */}
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {/* Displaying the "feels like" temperature */}
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* Displaying the humidity percentage */}
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {/* Displaying the wind speed in MPH */}
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
