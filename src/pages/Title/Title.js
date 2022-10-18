import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import MainContext from "../../context/MainContext";
import "./Title.css";
import starIcon from "../../images/star.svg";

const Title = () => {
  const { id } = useParams();
  const { setAlert, setRefresh, watchlist, setWatchlist } =
    useContext(MainContext);
  const [title, setTitle] = useState({});
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  useEffect(() => {
    setIsWatchlisted(watchlist.includes(id));
  }, [watchlist, id]);
  useEffect(() => {
    let recent = JSON.parse(localStorage.getItem("recent"));
    if (recent) {
      !recent.includes(id) && recent.unshift(id);
    } else {
      recent = [];
    }
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [id]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&i=${id}`)
      .then((resp) => {
        setTitle(resp.data);
        setRefresh((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [id, setAlert, setRefresh, watchlist]);
  const handleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist((prevList) => prevList.filter((title) => title !== id));
    } else {
      setWatchlist((prevList) => [...prevList, id]);
    }
  };
  console.log(watchlist);
  return (
    <div className="container">
      <ScrollToTop />
      <div className="title-heading">
        <div className="title-heading-left">
          <h3>{title.Title}</h3>
          <div className="title-heading-left-data">
            <p>{title.Type}</p>
            {title.Year && (
              <>
                {" "}
                <div className="dot-break"></div>
                <p>{title.Year}</p>
              </>
            )}
            {title.Runtime && (
              <>
                <div className="dot-break"></div>
                <p>{title.Runtime}</p>
              </>
            )}
          </div>
        </div>
        <div className="title-heading-right">
          <p className="rating-text">IMDb RATING</p>
          <div className="rating-box">
            <img src={starIcon} alt="star" />
            <p>
              <span className="rating">{title.imdbRating}</span> / 10
            </p>
          </div>
        </div>
      </div>
      <div className="title-media">
        <img src={title.Poster} alt={title.Title} className="title-poster" />
      </div>
      <div className="title-info">
        <div className="title-info-details">
          <div className="title-genres">
            {title.Genre &&
              title.Genre.split(",").map((genre, i) => {
                return <span key={i}>{genre}</span>;
              })}
          </div>
          <p className="title-plot">{title.Plot}</p>
          <div className="break-line"></div>
          {title.Director && title.Director !== "N/A" && (
            <>
              <div className="title-crew">
                <p>
                  {title.Director.split(",").length > 1
                    ? "Directors"
                    : "Director"}
                </p>
                {title.Director.split(",").map((director, i) => {
                  return <span key={i}>{director} </span>;
                })}
              </div>
              <div className="break-line"></div>
            </>
          )}
          {title.Writer && title.Writer !== "N/A" && (
            <>
              <div className="title-crew">
                <p>
                  {title.Writer.split(",").length > 1 ? "Writers" : "Writer"}
                </p>
                {title.Writer.split(",").map((writer, i) => {
                  return <span key={i}>{writer}</span>;
                })}
              </div>
              <div className="break-line"></div>{" "}
            </>
          )}
          {title.Actors && title.Actors !== "N/A" && (
            <>
              <div className="title-crew">
                <p>{title.Actors.split(",").length > 1 ? "Actors" : "Actor"}</p>
                {title.Actors.split(",").map((actor, i) => {
                  return <span key={i}>{actor}</span>;
                })}
              </div>
              <div className="break-line"></div>
            </>
          )}
          {title.Awards && title.Awards !== "N/A" && (
            <div className="title-awards">
              <div className="title-awards-block"></div>
              <div>{title.Awards}</div>
            </div>
          )}
        </div>
        <button
          className="title-watchlist-btn"
          onClick={() => handleWatchlist(title.imdbID)}
        >
          {isWatchlisted ? "✔ in Watchlist" : "+ Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default Title;
