import errorCat from "../error/error.gif";
import "../error/error.scss";
const error = () => {
  return (
    <div className="error">
      <div className="error__block">
        <h2>Something went wrong</h2>
        <img src={errorCat} style={{ width: "50%" }} alt="cat error"></img>
      </div>
    </div>
  );
};

export default error;
