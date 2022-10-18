import {useContext } from "react";
import MainContext from "../../context/MainContext";
import "./Watchlist.css";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"

const Watchlist = () => {
  const { watchlist } = useContext(MainContext);
  return (
    <div className="container">
      <ScrollToTop/>
      <h2 className="container-heading">Your Watchlist</h2>
      <div className="subheading">
        <div>{watchlist.length} titles</div>
      </div>
      <div className="watchlist-card-container">
        {watchlist?.sort().map((title) => {
          return <WatchlistCard titleID={title} />;
        })}
      </div>
    </div>
  );
};

export default Watchlist;
