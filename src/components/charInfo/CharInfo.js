import "./charInfo.scss";
import MarvelService from "../../service/marvelService";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import Skeleton from "../skeleton/Skeleton";
import { Component } from "react";

class CharInfo extends Component {
  state = {
    charSelected: null,
    error: false,
    loading: false,
    activeModal: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.upLoaded();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.upLoaded();
    }
  }

  activeModal = () => {
    this.setState({ activeModal: true });
  };

  upLoaded = () => {
    const { id } = this.props;
    if (!id) {
      return;
    }

    this.onCharLoading();
    this.activeModal();
    this.marvelService
      .getCharacter(process.env.REACT_APP_API_URL, id)
      .then(this.onCharLoaded)
      .catch(() => {
        this.setState({ error: true });
      });
  };

  onCharLoaded = (char) => {
    this.setState({
      charSelected: char,
      loading: false,
      error: false,
    });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  closeModal = (e) => {
    console.log(e);
    this.setState({ activeModal: false });
    this.props.onClearCharId();
  };

  render() {
    let modalActive = "char__background";
    const { loading, charSelected, error, activeModal } = this.state;
    const sceleton = !(loading || error || charSelected) ? <Skeleton /> : null;
    const errorMessages = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const view = !loading && charSelected ? <View char={charSelected} /> : null;
    if (activeModal) {
      modalActive += " char__background_active";
    }
    return (
      <div className={modalActive}>
        <div className="char__info">
          <span className="close__modal" onClick={this.closeModal}>
            &#10006;
          </span>
          {sceleton}
          {errorMessages}
          {spinner}
          {view}
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homePage, wiki, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homePage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {!comics.length ? "there are no comics on this hero" : null}
        {comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
