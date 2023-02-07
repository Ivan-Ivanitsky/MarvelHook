import "./charList.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../service/marvelService";
import Spinner from "../spinner/spinner";
import decoration from "../../resources/img/vision.png";
import Error from "../error/error";

const CharList = (props) => {
  const { loading, error, clearError, getAllcharacters } = useMarvelService();
  const [state, setState] = useState({
    characters: [],
    active: false,
    charOffset: 280,
    charLength: null,
    setNewItemLoading: true,
  });

  useEffect(() => {
    clearError();
    onLoadingChar();
    getItem(state.charOffset);
  }, []);

  function getItem(offset, characters) {
    const oldData = characters ? characters : "";
    onLoadedChar();
    getAllcharacters(process.env.REACT_APP_API_URL, offset).then((res) => {
      const data = res.data.results;
      setState((state) => ({
        ...state,
        characters: [...oldData, ...data],
        loadingOffset: false,
        setNewItemLoading: false,
        charLength: data.length,
      }));
    });
  }

  function onLoadingChar() {
    setState((state) => ({ ...state, loadingOffset: true }));
  }

  function onLoadedChar() {
    onLoadingChar();
    setState((state) => ({ ...state, charOffset: charOffset + 9 }));
  }

  function selectedItemCharActive(id) {
    const { characters } = state;
    clearSelectedCharActive();
    setState({
      ...state,
      characters: characters.map((item) => {
        if (item.id === id) item.active = true;
        return item;
      }),
    });
  }

  function clearSelectedCharActive() {
    const { characters } = state;
    setState({
      ...state,
      characters: characters.map((item) => {
        if (item.active) item.active = false;
        return item;
      }),
    });
  }

  const {
    characters,
    charOffset,
    loadingOffset,
    setNewItemLoading,
    charLength,
  } = state;
  let styleBtn = "button button__main button__long";
  if (loadingOffset) {
    styleBtn += " button__disabled";
  }
  const spinner = setNewItemLoading ? <Spinner /> : null;
  const errorChar = error ? <Error /> : null;
  const thumbnail = (
    <Thumbnail
      characters={characters}
      prop={props}
      onActivChar={selectedItemCharActive}
    />
  );

  return (
    <div className="char__list">
      {errorChar}
      <ul className="char__grid">
        {spinner}
        {thumbnail}
      </ul>
      <button
        className={styleBtn}
        onClick={() => getItem(charOffset, characters)}
      >
        <div className="inner">load more</div>
      </button>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </div>
  );
};

const Thumbnail = (props) => {
  const { characters, prop, onActivChar } = props;
  return characters.map((item) => {
    let charClass = "char__item";
    let imgStyle = { objectFit: "cover" };
    if (
      item.thumbnail.path + ".jpg" ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }
    if (item.active) {
      charClass += " char__item_selected";
    }
    if (!item) {
      return (
        <li className="char__item" key={item.id}>
          <span>Sorry can not find characters!</span>
        </li>
      );
    } else {
      const img = `${item.thumbnail.path}.jpg`;
      const name = `${item.name}`;
      return (
        <li
          className={charClass}
          key={item.id}
          onClick={() => {
            prop.onCharSelected(item.id);
            onActivChar(item.id);
          }}
        >
          <img src={img} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    }
  });
};

export default CharList;
