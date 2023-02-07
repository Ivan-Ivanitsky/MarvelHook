import "./appHeader.scss";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <NavLink exact to="/">
          <span>Marvel</span> information portal
        </NavLink>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink exact activeStyle={{ color: "#9F0013" }} to="/">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink activeStyle={{ color: "#9F0013" }} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
