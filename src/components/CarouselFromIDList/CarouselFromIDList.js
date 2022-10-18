import { useState, useEffect } from "react";
import CardFromID from "../CardFromID/CardFromID";
import "./CarouselFromIDList.css";

const CarouselFromList = (props) => {
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
    <>
      {titles?.length > 0 ? (
        <div
          className="footer-recent-container"
          style={{ transform: `translateX(-${activeIndex * 100}%` }}
        >
          {titles.map((title) => {
            return <CardFromID titleID={title} key={title} details={details} />;
          })}
        </div>
      ) : (
        <div className="empty">You have no recently viewed pages</div>
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
    </>
  );
};

export default CarouselFromList;
