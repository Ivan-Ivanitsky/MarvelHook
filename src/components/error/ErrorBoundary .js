import { Component } from "react";
import Error from "./error";

class ErrorBoundery extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorMessages) {
    console.log(error, errorMessages);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <Error />;
    }
    return this.props.children;
  }
}
export default ErrorBoundery;
