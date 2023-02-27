import axios from "axios";
import { useState } from "react";
import './Header.css';

export default function Header() {
    const apiKey = "f56f24967aaf51182d1d4df628297c6d"
    const [inputCity, setInputCity] = useState("")
    const [data, setData] = useState({})

    const getWetherDetails = (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
        axios.get(apiURL).then((res) => {
            console.log("response", res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const handleChangeInput = (e) => {
        console.log("value", e.target.value)
        setInputCity(e.target.value)
    }

    const handleSearch = () => {
        getWetherDetails(inputCity)
    }


    return (
        <div id="container">
            <div className="col-md-12">
                <h1 className="heading">Weather App</h1>
                <div className="search">
                    <input type="text" className="form-control"
                        value={inputCity}
                        onChange={handleChangeInput} />
                    <button className="btn btn-primary" type="button"
                        onClick={handleSearch}
                    >Search</button>
                </div>

                {Object.keys(data).length > 0 &&
                    <div className="output">
                        <h4>Weather Details of City :{data?.name}</h4>
                        <h4>Current Temperature :{((data?.main?.temp) - 273.15).toFixed(2)}°C</h4>
                        <h4>Temperature Range :{data?.main?.temp_min} to {data?.main?.temp_max}</h4>
                        <h4>Humidity :{data?.main?.humidity}</h4>
                        <h4>sea Level :{data?.main?.pressure}</h4>
                        <h4>Ground Level :{data?.wind?.deg}</h4>
                    </div>
                }
            </div>
        </div>
    );
}
