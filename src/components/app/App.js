import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../error/ErrorBoundary ";
import PropTypes from "prop-types";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { SingleComic } from "../pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const getId = JSON.parse(localStorage.getItem("id"));
  const [id, setId] = useState();
  const [idComic, setComicId] = useState(getId);

  function onCharSelected(id) {
    setId(id);
  }

  function onComicSelected(id) {
    setComicId(id);
  }

  function onClearCharId() {
    setId((id) => (id = null));
  }

  return (
    <div className="app">
      <div className="app__wrapper">
        <Router>
          <AppHeader />
          <main>
            <Switch>
              <Route exact path="/">
                <ErrorBoundery>
                  <RandomChar />
                </ErrorBoundery>
                <div className="char__content">
                  <ErrorBoundery>
                    <CharList onCharSelected={onCharSelected} />
                  </ErrorBoundery>
                  <ErrorBoundery>
                    <CharInfo id={id} onClearCharId={onClearCharId} />
                  </ErrorBoundery>
                </div>
              </Route>
              <Route exact path="/comics">
                <AppBanner></AppBanner>
                <ErrorBoundery>
                  <ComicsList onComicSelected={onComicSelected}></ComicsList>
                </ErrorBoundery>
              </Route>
              <Route exact path="/comics/:comicId">
                <SingleComic idComic={idComic}></SingleComic>
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
};

CharInfo.propTypes = { id: PropTypes.number };
export default App;
