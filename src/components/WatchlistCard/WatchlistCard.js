import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./WatchlistCard.css";
import MainContext from "../../context/MainContext";
import noImg from "../../images/no-img.png";
import bookmarkImg from "../../images/bookmark.svg";
import bookmarkGoldImg from "../../images/bookmark_gold.svg";
import add from "../../images/add.svg";
import bookmarkedImg from "../../images/bookmarked_check.svg";
import starIcon from "../../images/star.svg";

const WatchlistCard = (props) => {
  const { titleID } = props;
  const { setAlert, watchlist, setWatchlist } = useContext(MainContext);
  const [title, setTitle] = useState({});
  const [isWatchlisted, setIsWatchlisted] = useState(true);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&i=${titleID}`)
      .then((resp) => setTitle(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [titleID, setAlert]);
  const handleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist((prevList) => prevList.filter((title) => title !== id));
    } else {
      setWatchlist((prevList) => [...prevList, id]);
    }
  };
  useEffect(() => {
    setIsWatchlisted(watchlist.includes(title.imdbID));
  }, [watchlist, title.imdbID]);
  return (
    <div className="watchlist-card">
      <Link to={`/title/${title.imdbID}`}>
        <img
          src={title.Poster === "N/A" ? noImg : title.Poster}
          alt={title.Title}
          className="watchlist-card-poster"
        ></img>
      </Link>
      <div
        className="card-addToWatchlist"
        onClick={() => handleWatchlist(title.imdbID)}
      >
        <div
          className="bookmark_img"
          style={{
            backgroundImage: `url(${
              isWatchlisted ? bookmarkGoldImg : bookmarkImg
            })`,
          }}
        >
          <img
            src={isWatchlisted ? bookmarkedImg : add}
            alt="add to watchlist"
            className="add_img"
          />
        </div>
      </div>
      <div className="watchlist-card-info">
        <h5 className="watchlist-card-title">{title.Title}</h5>
        <div className="flex-start small-text">
          {title.Year} <div className="dot-break"></div> {title.Type}
        </div>
        <div className="rating-box">
          <img src={starIcon} alt="star" />
          <p>
            <span className="rating">{title.imdbRating}</span> / 10
          </p>
        </div>
        <div className="watchlist-card-plot">{title.Plot}</div>
      </div>
    </div>
  );
};

export default WatchlistCard;
