import React, { useState, useEffect } from 'react'
import axios from 'axios'

let temp_c=100;
let cond_icon='';
let wind_kph=0;
let wind_dir= 'N';

const App = () => {
  const [ allCountries, setCountries] = useState([])
  const [ Filter, setFilter ] = useState('')
  const [ showMe, setShow ] = useState(0)
  const [ showCountry, setCountry ] = useState([])
  const [ WeatherData, setWeather ] = useState([])
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries( response.data )
      })
  }
  
  useEffect(hook, [])
     
  const Handler = (event) => {
    setFilter(event.target.value)
    setShow(0);
  }

  const Langlist = ({langs}) => {
    return (
      <div> {
        langs.map( lng => {
          return <li key={lng.name}> {lng.name} </li>
        })}
      </div>
    )
  }
/*
  console.log('after', WeatherData.length, temp_c, cond_icon, wind_kph, wind_dir)
*/
const GetWeather = ({address}) => {
    const promise = axios.get(address)
    promise.then(response => {
      setWeather(response.data)
      temp_c = response.data.current.temp_c
      cond_icon = response.data.current.condition.icon
      wind_kph = response.data.current.wind_kph
      wind_dir = response.data.current.wind_dir
    })
      return (
        <div>
          <div><b> temperature: </b>{temp_c} Celsius</div>
          <img src={cond_icon} alt='condition' height="100" />
          <div><b> wind: </b>{wind_kph} kph direction {wind_dir}</div>
        </div>
      )

  }

  const Countryinfo = ({country}) => {
    return (
      <div>
        <h1> {country.name} </h1>
        <div>capital {country.capital}</div>
        <div>copulation {country.population}</div>
        <h2> languages </h2>
        <div> <Langlist langs={country.languages} /> </div>
        <div><h2>
          <img src={country.flag} alt={country.name} height="100" />
        </h2></div>
        <div><h2>Weather in {country.capital}</h2></div>
        {<GetWeather address={'http://api.apixu.com/v1/current.json?key=5cffebb98aba4acc969150534190307&q=' + country.capital} />}

    </div> 
    )
  }
  
  const show = (country, event) => {
    event.preventDefault()
    setShow(1);
    setCountry(country)
    console.log('show ', country.name)
  }

  const display= () => {
 
    const result = allCountries.filter(country =>
      country.name.toLowerCase().includes(Filter.toLowerCase()))
    
      if(showMe===1)
        return( <Countryinfo country={showCountry} /> )

      if(result.length===1)
        return( <Countryinfo country={result[0]} /> )

      if(result.length > 10)
        return( 'too many matches, specify another filter' )

        if((result.length < 10) && (result.length > 1))
        return (
          <div> {
            result.map(country => {
              return (
                <div key={country.alpha2Code} > {country.name}
                
                <button onClick={(event) => show(country, event)}>show</button>
                </div>
              )
            })
          } </div>
      )
  }

  return (
    <div>
      find countries <input value={Filter} onChange={Handler} />

      <div> {display()} </div>

    </div>
  )
}

export default App;

