import { Component } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../service/marvelService";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      loading: true,
      errorMessages: false,
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.getIdCharacter();
  }

  onUpdateCharacter = (char) => {
    this.setState({ char, loading: false });
  };

  getIdCharacter = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(process.env.REACT_APP_API_URL, id)
      .then(
        this.onUpdateCharacter,
        this.setState({ loading: true, errorMessages: false })
      )
      .catch(() => {
        this.setState({ loading: false, errorMessages: true });
      });
  };

  render() {
    const { char, loading, errorMessages } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const error = errorMessages ? <Error /> : null;
    const viewContent = !(loading || errorMessages) ? (
      <ViewChar char={char} />
    ) : null;

    return (
      <div className="randomchar">
        {spinner}
        {viewContent}
        {error}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main "
            onClick={() => {
              this.getIdCharacter();
            }}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const ViewChar = ({ char }) => {
  const { name, description, thumbnail, homePage, wiki } = char;
  const path =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  let changeStyle = "";

  if (path === thumbnail) {
    changeStyle += "contain";
  }
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={{ objectFit: changeStyle }}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description.length >= 200
            ? `${description.substring(0, 200)}...`
            : description}
        </p>
        <div className="randomchar__btns">
          <a href={homePage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
