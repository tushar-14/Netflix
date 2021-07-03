import React, { useState, useEffect } from "react";
import requests from "../requests";
import "../banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const request = await fetch(requests.fetchNetftixOriginals);
      const data = await request.json();
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return request;
    };

    fetchdata();
  }, []);

  function truncate(s, n) {
    if (s ? s.length : null > n) {
      return s.substr(0, n - 1) + "...";
    } else {
      return s;
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}?.")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>

        <h1 className="banner_description">{truncate(movie.overview, 150)}</h1>
      </div>
      <div className="banner_fadebottom" />
    </header>
  );
}

export default Banner;
