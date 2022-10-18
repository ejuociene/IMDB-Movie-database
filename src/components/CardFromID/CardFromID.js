import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MainContext from "../../context/MainContext";
import Card from "../Card/Card";

const RecentCard = (props) => {
  const { titleID, details } = props;
  const { setAlert, watchlist } = useContext(MainContext);
  const [title, setTitle] = useState({});
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=86c15441&i=${titleID}`)
      .then((resp) => setTitle(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [setAlert, titleID, watchlist]);
  return <Card title={title} details={details} />;
};

export default RecentCard;
