import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/weatherCard/WeatherCard';
import SearchBar from './components/searchBar/SearchBar';

const keyAPI = 'a4b786a4ac09f4c6dc57e9e58f9f754b';

function App() {

  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);



  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])
  
  
  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}`;
      axios.get(url)
        .then(answer => {
          const kelvin = answer.data.main.temp;
          const celcius = (kelvin - 273.15).toFixed(2);
          const fah = (celcius * (9/5) + 32).toFixed(2);
          setTemp({cel: celcius, fah: fah}) 

          setWeather(answer.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [coords]);

  
  const getBackgroundImage = () => {
    if (!temp) return '';
    const celcius = parseFloat(temp.cel);
    if (celcius < 10) {
      return 'url(https://images.pexels.com/photos/772476/pexels-photo-772476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; 
    } else if (celcius >= 10 && celcius < 25) {
      return 'url(https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; 
    } else if (celcius >= 25 && celcius < 35) {
      return 'url(https://wallpapercave.com/wp/wp3085440.jpg)';
    } else {
      return 'url(https://cdn.pixabay.com/photo/2023/11/20/18/21/sunset-8401670_1280.jpg)'; 
    }
  };

  const fetchWeatherByCity = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`;
    setIsLoading(true);
    axios.get(url)
      .then(answer => {
        const kelvin = answer.data.main.temp;
        const celcius = (kelvin - 273.15).toFixed(2);
        const fah = (celcius * (9/5) + 32).toFixed(2);
        setTemp({ cel: celcius, fah: fah });
        setWeather(answer.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      });
  };



  return (
    <>
      <div className='app' style={{ backgroundImage: getBackgroundImage() }}>
        
        {
          isLoading ? 
            <figure>
              <img src="https://i.gifer.com/XOsX.gif" alt="loading" className='loading__img'/>
            </figure>
            :
            <>
              <SearchBar onSearch={fetchWeatherByCity} />
              <WeatherCard weather={weather} temp={temp}/>
            </>
        }
      </div>
    </>
  )
}

export default App
