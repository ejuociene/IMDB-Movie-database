import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Card from "../../components/Card/Card";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"

const Search = () => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const [alert, setAlert] = useState("");
  const { id } = useParams();
  const handlePrevPage = () => {
    currentPage !== 1 && setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    currentPage !== totalPages && setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=86c15441&s=${id}&page=${currentPage}`
      )
      .then((resp) => {
        setResults(resp.data.Search);
        setTotalPages(Math.ceil(resp.data.totalResults / moviesPerPage));
      })
      .catch((error) => {
        console.log(error);
        setAlert("Oops, there seems to be a mistake. Please refresh the page.");
      });
  }, [currentPage, id]);
  return (
    <div className="container">
      <ScrollToTop/>
      <h2 className="container-heading">Search: "{id}"</h2>
      {alert && <div>{alert}</div>}
      <div className="search-container">
        {results &&
          results.map((title) => {
            console.log(title);
            return <Card title={title} key={title.imdbID} details={true} />;
          })}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <div
            className={`pagination-prev ${
              currentPage === 1 && "pagination-disabled"
            }`}
            onClick={() => handlePrevPage()}
          >
            Previous
          </div>
          <div
            className={`pagination-next ${
              currentPage === totalPages && "pagination-disabled"
            }`}
            onClick={() => handleNextPage()}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
