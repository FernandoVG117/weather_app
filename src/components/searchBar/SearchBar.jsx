import React, { useState } from 'react';
import './searchBar.css';

const SearchBar = ({onSearch}) => {

    const [city, setCity] = useState('');

    const handleChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(city);
    };

    return (
        <div className='search'>
            <form onSubmit={handleSubmit} className='search__form'>
                <input 
                    type="text" 
                    value={city} 
                    onChange={handleChange} 
                    placeholder="Enter city name" 
                    required
                />
                <button type="submit" className='search__btn'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar
