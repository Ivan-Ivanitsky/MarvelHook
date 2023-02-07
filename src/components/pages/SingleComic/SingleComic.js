import "./singleComic.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../../service/marvelService";
import Spinner from "../../spinner/spinner";
import { Link } from "react-router-dom";

const SingleComic = (props) => {
  const [state, setComic] = useState("");
  const { loading, getComicId } = useMarvelService();
  const viewComic = state.comic ? <ViewComic comic={state.comic} /> : null;
  const spinner = loading ? <Spinner /> : null;

  const { idComic } = props;
  useEffect(() => {
    getComic();
  }, [idComic]);

  function getComic() {
    getComicId(process.env.REACT_APP_API_URL_COMICS, idComic).then((comic) => {
      setComic(() => ({
        comic: comic,
      }));
    });
  }

  return (
    <>
      {spinner}
      {viewComic}
    </>
  );
};

const ViewComic = ({ comic }) => {
  return (
    <div className="single-comic">
      <img src={comic.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.name}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pages}</p>
        <p className="single-comic__descr">{"Language: " + comic.language}</p>
        <div className="single-comic__price">
          {"price: " + comic.price + "$"}
        </div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
