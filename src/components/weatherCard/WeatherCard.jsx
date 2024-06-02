import React, { useState } from 'react'
import './weatherCard.css'

const WeatherCard = ({weather, temp}) => {

      //
  const [isCelcius, setIsCelcius] = useState(true);
  //
    const handleToggleTemp = () => {
        setIsCelcius(!isCelcius);
    }

  return (
    <>
        <div className='weathercard'>
            <h1 className='weathercard__title'>Weather App</h1>
            <h2 className='weathercard__city'>{weather?.name} - {weather?.sys.country}</h2>
            <section className='weathercard__body'>
                <figure className='weathercard__img'>
                    <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather image" />
                </figure>
                <article className='weathercard__data'>
                    <h3 className='weathercard__description'>"{weather?.weather[0].description}"</h3>
                    <ul className='weathercard__list'>
                        <li className='weathercard__item'><span>Windy speed:</span><span className='item__value'>{weather?.wind.speed} m/s</span></li>
                        <li className='weathercard__item'><span>Clouds:</span> <span className='item__value'>{weather?.clouds.all} %</span></li>
                        <li className='weathercard__item'><span>Pressure:</span> <span className='item__value'>{weather?.main.pressure} hPa</span></li>
                    </ul>
                </article>
            </section>
            <h2 className='weathercard__temp'>
                {isCelcius ? temp?.cel : temp?.fah} °{isCelcius ? 'C' : 'F'}
            </h2>
            <button onClick={handleToggleTemp} className='weathercard__btn'>
                Change to {isCelcius ? '°F' : '°C'}
            </button>
        </div> 
    </>
  )
}

export default WeatherCard
