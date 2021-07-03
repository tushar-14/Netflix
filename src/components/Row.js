import React, { useState, useEffect } from "react";
import "../row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
// import axios from "./axios";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const request = await fetch(fetchUrl);
      const data = await request.json();
      // console.log(data.results);

      setmovies(data.results);
      return request;
    };
    fetchdata();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleclick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={`${isLargeRow ? "random" : "containers"} `}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleclick(movie)}
            className={`image ${isLargeRow && "row_posterLarge "}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || movie.name || movie.original_name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
export default Row;
