import "./comicsList.scss";
import Spinner from "../spinner/spinner";
import Error from "../error/error";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../service/marvelService";

const ComicsList = (props) => {
  const { getAllcomics, loading, error, clearError } = useMarvelService();

  const [state, setState] = useState({
    comics: [],
    active: false,
    loadingOffset: 10,
  });

  useEffect(() => {
    clearError();
    getResurce(state.loadingOffset);
  }, []);

  function getResurce(offset, comics) {
    onLoading();
    const oldData = comics ? comics : "";
    getAllcomics(process.env.REACT_APP_API_URL_COMICS, offset).then((res) => {
      const data = res;
      setState((state) => ({
        ...state,
        comics: [...oldData, ...data],
        loadingOffset: loadingOffset + 8,
        active: false,
      }));
    });
  }

  function setComicId(id) {
    const setLocalStore = localStorage.setItem("id", JSON.stringify(id));
    props.onComicSelected(id);
  }

  function onLoading() {
    setState((state) => ({
      ...state,
      active: true,
    }));
  }
  const { loadingOffset, comics, active } = state;
  const spinner = loading && comics.length < 8 ? <Spinner /> : null;
  const comicsItems = (
    <ComicsItems comics={state.comics} setComicId={setComicId} />
  );
  const errors = error ? <Error /> : null;

  let styleBtn = "button button__main button__long";
  if (active) {
    styleBtn += " button__disabled";
  }

  return (
    <div className="comics__list">
      {spinner}
      {errors}
      <ul className="comics__grid">{comicsItems}</ul>
      <button className={styleBtn}>
        <div
          className="inner"
          onClick={() => getResurce(loadingOffset, comics)}
        >
          load more
        </div>
      </button>
    </div>
  );
};

const ComicsItems = (props) => {
  const { comics, setComicId } = props;
  return comics.map((item, i) => {
    return (
      <li
        key={i}
        className="comics__item"
        onClick={() => {
          setComicId(item.id);
        }}
      >
        <Link to={`/comics/${item.id}`}>
          <img
            src={item.thumbnail.path + ".jpg"}
            alt="ultimate war"
            className="comics__item-img"
          />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">
            {item.prices[0].price
              ? item.prices[0].price + "$"
              : "not available"}
          </div>
        </Link>
      </li>
    );
  });
};
export default ComicsList;
