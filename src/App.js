import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContext from "./context/MainContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Title from "./pages/Title/Title";
import Watchlist from "./pages/Watchlist/Watchlist";
import Alert from "./components/Alert/Alert";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [alert, setAlert] = useState("");
  const [watchlist, setWatchlist] = useState(
    () => JSON.parse(localStorage.getItem("watchlist")) || []
  );
  useEffect(() => {
    watchlist !== [] &&
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  const contextValues = {
    alert,
    setAlert,
    refresh,
    setRefresh,
    watchlist,
    setWatchlist,
  };
  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <main className="App">
          <Alert />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search/:id/" element={<Search />}></Route>
            <Route path="/title/:id/" element={<Title />}></Route>
            <Route path="/watchlist/" element={<Watchlist />}></Route>
          </Routes>
        </main>
        <Footer />
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
