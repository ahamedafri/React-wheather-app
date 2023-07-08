import React, {useState} from 'react';
import axios from 'axios';


const Weather = () => {
    const [location,setLocation] = useState('');
    const [weatherData,setWeatherData] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      getWeatherData();
      getBackgroundImage();
    }
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 const getBackgroundImage = async () => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    );
    setBackgroundImage(response.data.urls.regular);
  } catch (error) {
    console.error(error);
  }
};


 return (
      <div className="bg_img">      
        <form >
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="city-input"
          />
       </div>   
         
        </form>
        {weatherData && (
          <div className="weather-info">
            <div className='box_container'>
            <div className="top nbox">
              {/* <div className="location ">
                <h1>{weatherData.name}</h1>
              </div> */}
              <div className="temp">
                {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description">
                {weatherData.weather ? <h2>{weatherData.weather[0].main}</h2> : null}
              </div>
              

            </div>
            <div className="nbox" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', width: '50%', height: '230px'}}>
                <h1>{weatherData.name}</h1>
              </div> 
           </div>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{weatherData.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{weatherData.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box" >
                 <p>Feels Like</p>
                  <h1>{weatherData.main.feels_like.toFixed()} °C</h1>
              </div>

            </div>
          </div>
        )}
      </div>
);
};

export default Weather;