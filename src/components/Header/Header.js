import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import menuIcon from "../../images/menu.svg";
import logo from "../../images/logo.svg";
import searchIconWhite from "../../images/search.svg";
import searchIconGrey from "../../images/search_grey.svg";
import watchlistIcon from "../../images/watchlist.svg";
import closeBtn from "../../images/closeBtn.svg";
import MainContext from "../../context/MainContext";

const Header = () => {
  const { watchlist } = useContext(MainContext);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setSearchInput("");
    navigate(`/search/${searchInput}`);
  };
  return (
    <header>
      <nav>
        <div className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <div className="menu-container">
            <img src={menuIcon} alt="menu" className="menu" />
            <div className="menu-text">Menu</div>
          </div>
        </div>
        <form className="desktop-search" onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            placeholder="Search IMDb"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="desktop-search-btn">
            <img src={searchIconGrey} alt="search" type="submit"></img>
          </button>
        </form>
        <div className="mobile-search">
          <img
            src={searchIconWhite}
            alt="search"
            className="mobile-search-icon"
            onClick={() => setShowSearch(true)}
          ></img>
          <form
            className={`mobile-search-input ${!showSearch && "hidden"}`}
            onSubmit={(e) => handleSearch(e)}
          >
            <input
              type="text"
              placeholder="Search IMDb"
              name="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <img
              src={closeBtn}
              alt="close search"
              className="mobile-close-icon"
              onClick={() => setShowSearch(false)}
            />
          </form>
        </div>
        <div
          className="watchlist-container"
          onClick={() => navigate("/watchlist")}
        >
          <img
            src={watchlistIcon}
            alt="watchlist"
            className="watchlist-icon"
          ></img>
          <div>Watchlist</div>
          {watchlist?.length > 0 && (
            <div className="watchlist-count">{watchlist.length}</div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
