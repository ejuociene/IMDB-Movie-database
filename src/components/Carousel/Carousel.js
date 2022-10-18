import { useState, useEffect } from "react";
import "./Carousel.css";
import Card from "../Card/Card";

const Carousel = (props) => {
  const { titles, details } = props;
  const [width, setWidth] = useState(window.innerWidth);
  const [activeIndex, setActiveIndex] = useState(0);
  const columns = width < 600 ? 2 : width < 1024 ? 3 : 5;
  const activeNext = Math.ceil(titles?.length / columns) > activeIndex + 1;
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <div className="carousel">
      {" "}
      {titles && (
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%` }}
        >
          {titles.map((title) => {
            return <Card title={title} key={title.imdbID} details={details} />;
          })}
        </div>
      )}
      {activeIndex > 0 && (
        <button
          className="btn-arrow btn-back"
          onClick={() => setActiveIndex((prevIndex) => prevIndex - 1)}
        ></button>
      )}
      {activeNext && (
        <button
          className="btn-arrow btn-next"
          onClick={() => setActiveIndex((prevIndex) => prevIndex + 1)}
        ></button>
      )}
    </div>
  );
};

export default Carousel;
