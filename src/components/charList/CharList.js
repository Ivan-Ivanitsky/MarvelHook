import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../service/marvelService";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

class CharList extends Component {
  state = {
    characters: [],
    error: false,
    loading: true,
    active: false,
    charOffset: 280,
    loadingOffset: false,
    charLength: null,
  };

  marvelService = new MarvelService();

  getItem = (offset, characters) => {
    const oldData = characters ? characters : "";
    this.onLoadedChar();
    this.marvelService
      .getAllcharacters(process.env.REACT_APP_API_URL, offset)
      .then((res) => {
        const data = res.data.results;
        this.setState({
          characters: [...oldData, ...data],
          loading: false,
          error: false,
          loadingOffset: false,
          charLength: data.length,
        });
        this.buttonDisabled(this.state.charLength);
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      });
  };

  componentDidMount() {
    this.onLoadingChar();
    this.getItem(this.state.charOffset);
  }

  buttonDisabled = (charLength) => {
    if (charLength < 9) {
      this.setState({ loadingOffset: true });
    }
  };

  onLoadingChar = () => {
    this.setState({ loadingOffset: true });
  };

  onLoadedChar = () => {
    this.onLoadingChar();
    this.setState(({ charOffset }) => ({
      charOffset: charOffset + 9,
    }));
  };

  selectedItemCharActive = (id) => {
    const { characters } = this.state;
    this.clearSelectedCharActive();
    this.setState({
      characters: characters.map((item) => {
        if (item.id === id) item.active = true;
        return item;
      }),
    });
  };

  clearSelectedCharActive = () => {
    const { characters } = this.state;
    this.setState({
      characters: characters.map((item) => {
        if (item.active) item.active = false;
        return item;
      }),
    });
  };

  render() {
    const { characters, loading, error, charOffset, loadingOffset } =
      this.state;
    let styleBtn = "button button__main button__long";
    if (loadingOffset) {
      styleBtn += " button__disabled";
    }
    const spinner = loading ? <Spinner /> : null;
    const errorChar = error ? <Error /> : null;
    const thumbnail = (
      <Thumbnail
        characters={characters}
        prop={this.props}
        onActivChar={this.selectedItemCharActive}
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
          onClick={() => this.getItem(charOffset, characters)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

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
