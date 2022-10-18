import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroCarousel.css";

const Carousel = (props) => {
  const { movies } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const updateIndex = (index) => {
    if (index > movies.length - 1) {
      setActiveIndex(0);
    } else if (index < 0) {
      setActiveIndex(movies.length - 1);
    } else {
      setActiveIndex(index);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  return (
    <div className="carousel-container">
      <div className="hero-carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {movies.map((movie) => {
            return (
              <img
                src={movie.Poster}
                alt={movie.Title}
                key={movie.imdbID}
                className="carousel-item"
                onClick={() => navigate(`/title/${movie.imdbID}`)}
              />
            );
          })}
        </div>
        <button
          className="btn-arrow btn-back-hero"
          onClick={() => updateIndex(activeIndex - 1)}
        ></button>
        <button
          className="btn-arrow btn-next-hero"
          onClick={() => updateIndex(activeIndex + 1)}
        ></button>
      </div>
      <div className="up-next">
        <h4>Up next</h4>
        <div className="carousel-up-next">
          <div
            className="inner-up-next"
            style={{ transform: `translateY(-${activeIndex * 10 + 10}em)` }}
          >
            {movies.map((movie) => {
              return (
                <div
                  className="up-next-card"
                  key={movie.imdbID}
                  onClick={() => navigate(`/title/${movie.imdbID}`)}
                >
                  <img src={movie.Poster} alt={movie.Title} />
                  <div>
                    <h5 className="card-title">{movie.Title}</h5>
                    <div className="card-info">
                      {movie.Year} <div className="dot-break"></div>{" "}
                      {movie.Type}
                    </div>
                  </div>
                </div>
              );
            })}
            {movies.map((movie) => {
              return (
                <div
                  className="up-next-card"
                  key={movie.imdbID}
                  onClick={() => navigate(`/title/${movie.imdbID}`)}
                >
                  <img src={movie.Poster} alt={movie.Title} />
                  <div>
                    <h5 className="card-title">{movie.Title}</h5>
                    <div className="card-info">
                      {movie.Year} <div className="dot-break"></div>{" "}
                      {movie.Type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
