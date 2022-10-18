import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import noImg from "../../images/no-img.png";
import bookmarkImg from "../../images/bookmark.svg";
import bookmarkGoldImg from "../../images/bookmark_gold.svg";
import add from "../../images/add.svg";
import bookmarkedImg from "../../images/bookmarked_check.svg";
import watchlistCheckImg from "../../images/watchlist_check.svg";
import addToWatclistImg from "../../images/add_to_watchlist.svg";
import MainContext from "../../context/MainContext";

const Card = (props) => {
  const { title, details } = props;
  const { watchlist, setWatchlist } = useContext(MainContext);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const handleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist((prevList) => prevList.filter((title) => title !== id));
    } else {
      setWatchlist((prevList) => [...prevList, id]);
    }
  };
  useEffect(() => {
    setIsWatchlisted(watchlist.includes(title.imdbID));
  }, [watchlist, handleWatchlist, title.imdbID]);
  return (
    <div className="card">
      <Link to={`/title/${title.imdbID}`}>
        <img
          src={title.Poster === "N/A" ? noImg : title.Poster}
          alt={title.Title}
          className="card-poster"
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
      <h5 className="card-title">{title.Title}</h5>
      {details && (
        <>
          <div className="card-info">
            {title.Year} <div className="dot-break"></div> {title.Type}
          </div>
          <button
            className="card-btn"
            onClick={() => handleWatchlist(title.imdbID)}
          >
            <img
              src={isWatchlisted ? watchlistCheckImg : addToWatclistImg}
              alt="add to watchlist"
            ></img>{" "}
            Watchlist
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
