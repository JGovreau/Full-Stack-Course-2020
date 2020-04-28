import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryDisplay = ({ country }) => {
    const [ weather, setWeather ] = useState({})

    const weatherURL = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital
    
    const weatherHook = () => {
        axios
            .get(weatherURL)
            .then(response =>
                setWeather(response.data.current)
            )
    } 
    
    useEffect(weatherHook, [])

    // Display a single country's information
    return (
        <div>
            <h1>{country.name}</h1>

            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            
            <h3>Languages</h3>
            {country.languages.map(language =>
                (<li key={language.iso639_1}>{language.name}</li>)
            )}

            <br/>
            <img src={country.flag} alt="flag" width="300" height="200"/>
            <br/>
            <h3>Weather in {country.name}</h3>
            <b>Temperature: {weather.temperature}</b>
            <br/>
            <b>Wind: {weather.wind_speed} mph in direction {weather.wind_dir}</b>
            <br/>
            <b>Humidity: {weather.humidity}</b>
        </div>
    )
}


const CountriesDisplay = ({ displayedCountries, showHandler }) => {

    // Don't list if 10 or more countries return
    if (displayedCountries.length > 10) {
        return <p>Too many countries, specify another filter</p>
    }

    // List countries if between 2 and 9
    else if (displayedCountries.length < 10 && displayedCountries.length > 1) {
        return (
            <div>
                {displayedCountries.map(country =>
                    <p key={country.name}>
                        {country.name}
                        <button onClick={() => showHandler(country)}>
                            show
                        </button>
                    </p>
                )}
            </div>
        )
    }

    // Return country information if there's a single match
    else if (displayedCountries.length === 1) {
        return <CountryDisplay country={displayedCountries[0]} />
    }

    return (<div></div>)
}

const App = () => {
    const [ allCountries, setAllCountries ] = useState([])
    const [ filteredCountries, setFilteredCountries ] = useState([])
    const [ countrySearchString, setCountrySearchString ] = useState('')

    // API call to retrieve all country data
    const allCountriesHook = () => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setAllCountries(response.data)
            })
    }

    useEffect(allCountriesHook, [])


    // Input update and filtering logic
    const handleCountrySearch = (event) => {
        setCountrySearchString(event.target.value)

        // Filter logic
        const tmpFilteredCountries = allCountries.filter(country =>
            country.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        )

        setFilteredCountries(tmpFilteredCountries)
    }

    // Handle onClick event for the "show" button
    // Passed in as a prop for CountriesDisplay
    const handleShow = (country) => {
        console.log(country.name)
        setFilteredCountries([country])
        return (
            <CountryDisplay country={country} />
        )
    }

    return (
        <div>
            find countries: <input value={countrySearchString} onChange={handleCountrySearch} />
            <CountriesDisplay displayedCountries={filteredCountries} showHandler={handleShow} />
        </div>
    )
}

export default App