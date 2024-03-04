import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4ab5256a0bf185f2efe6cd382e950d2b&units=metric&lang=pl`;

  const Wyszukaj = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLocation("");
    }
  };


  return (
    <div className="m-0 p-0 bg-slate-900 h-dvh w-dvw flex flex-col items-center align-middle justify-center">
      <h1 className="text-white mb-9">Pogodynka</h1>
      <div className="bg-slate-800 items-center align-middle h-20 w-1/8 rounded-md flex justify-left px-10">
        <input
          className="px-3 m-1 items-center align-middle h-10 bg-white rounded-md text-black"
          title="elo"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={Wyszukaj}
          placeholder="Wpisz miejscowość..."
          value={location}
        />
      </div>
      <div className=" mt-10 flex bg-slate-800 w-1/5 h-1/5 rounded-md justify-center items-center align-middle">
        {error && <p className="text-red-500">{error}</p>}
        {data.name && (
          <div className="text-white">
            <h2>{data.name}</h2>
            <p>Temperatura: {(data.main.temp).toFixed(2)}°C</p>
            <p>Wilgotność: {data.main.humidity}%</p>
            <p>Ciśnienie: {data.main.pressure} hPa</p>
            <p>Wiatr: {data.wind.speed} m/s</p>
            <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
            className="w-20 h-20 mt-4"
          />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;