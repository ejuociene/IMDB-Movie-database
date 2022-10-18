import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import nextImg from "../../images/next.svg";
import Carousel from "../../components/Carousel/Carousel";
import MainContext from "../../context/MainContext";
import CarouselFromIDList from "../../components/CarouselFromIDList/CarouselFromIDList";

const Home = () => {
  const { setAlert, watchlist } = useContext(MainContext);
  const [carousel, setCarousel] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&s=you&page=1`)
      .then((resp) => setCarousel(resp.data.Search))
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [setAlert]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&s=top&page=1`)
      .then((resp) => setTopPicks(resp.data.Search))
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [setAlert]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&s=halloween&page=1`)
      .then((resp) => setHolidays(resp.data.Search))
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [setAlert]);
  return (
    <div className="container">
      <div className="hero">
        <HeroCarousel movies={carousel} />
      </div>
      <div className="what-to-watch">
        <h1>What to watch</h1>
        <section className="home-section">
        <div className="home-subheading" onClick={() => navigate("/search/top")}>
          <div className="subheading-border"></div>
          <h2>Top picks</h2>
          <img src={nextImg} alt="forward" className="forward"></img>
        </div>
        <p>TV shows and movies just for you</p>
        <div className="top-picks-container">
          <div className="top-picks-inner">
            {topPicks && <Carousel titles={topPicks} details={true} />}
          </div>
        </div>
      </section>
      <br></br>
      <section className="home-section">
      <div className="home-subheading" onClick={() => navigate("/search/halloween")}>
      <div className="subheading-border"></div>
          <h2>Upcoming Holidays</h2>
          <img src={nextImg} alt="forward"></img>
        </div>
        <p>Get ready for the holiday season</p>
        <div className="top-picks-container">
          <div className="top-picks-inner">
            {topPicks && <Carousel titles={holidays} details={true} />}
          </div>
        </div>
      </section>
      <br></br>
     <section className="home-section">
     <div className="home-subheading" onClick={() => navigate("/watchlist")}>
        <div className="subheading-border"></div>
        <h2>From your Watchlist</h2>
        <img src={nextImg} alt="forward"></img>
      </div>
      <p>Movies and TV shows that you have watchlisted</p>
      <div className="carousel-from-ID">
        <CarouselFromIDList titles={watchlist} details={true} />
      </div>
    </section>
    </div>
    </div>
  );
};

export default Home;
