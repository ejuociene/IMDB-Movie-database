import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext";
import "./Footer.css";
import facebookImg from "../../images/facebook.svg";
import instagramImg from "../../images/instagram.svg";
import twitchImg from "../../images/twitch.svg";
import twitterImg from "../../images/twitter.svg";
import youtubeImg from "../../images/youtube.svg";
import CarouselFromIDList from "../CarouselFromIDList/CarouselFromIDList";

const Footer = () => {
  const { refresh } = useContext(MainContext);
  const [recentTitles, setRecentTitles] = useState([]);
  useEffect(() => {
    setRecentTitles(JSON.parse(localStorage.getItem("recent")));
  }, [refresh]);
  const clearRecent = () => {
    localStorage.clear();
    setRecentTitles([]);
  };
  return (
    <footer>
      <div className="container">
        <div className="carousel-from-ID">
          <div className="flex">
            <h2>Recently viewed</h2>
            <p className="cblue" onClick={clearRecent}>
              Clear all
            </p>
          </div>
          <CarouselFromIDList titles={recentTitles} details={false} />
        </div>
      </div>
      <div className="footer-details">
        <div className="social">
          <Link to={`https://www.facebook.com/imdb`}>
            <img src={facebookImg} alt="facebook" className="social-icon" />
          </Link>
          <Link to={`https://www.instagram.com/imdb/`}>
            <img src={instagramImg} alt="instagram" className="social-icon" />
          </Link>
          <Link to={`https://www.twitch.tv/IMDb`}>
            <img src={twitchImg} alt="twitch" className="social-icon" />
          </Link>
          <Link to={`https://twitter.com/imdb`}>
            <img src={twitterImg} alt="twitter" className="social-icon" />
          </Link>
          <Link to={`https://www.youtube.com/imdb`}>
            <img src={youtubeImg} alt="youtube" className="social-icon" />
          </Link>
        </div>
        <p className="small-text">© Eglė Juočienė 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
