import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import ErrorBoundery from "../error/ErrorBoundary ";
import PropTypes from "prop-types";
import { Component } from "react";

class App extends Component {
  state = {
    id: null,
  };

  onCharSelected = (id) => {
    this.setState({ id: id });
  };

  onClearCharId = () => {
    this.setState({ id: null });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundery>
            <RandomChar />
          </ErrorBoundery>
          <div className="char__content">
            <ErrorBoundery>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundery>
            <ErrorBoundery>
              <CharInfo id={this.state.id} onClearCharId={this.onClearCharId} />
            </ErrorBoundery>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

CharInfo.propTypes = { id: PropTypes.number };
export default App;
