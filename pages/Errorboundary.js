//  seis copyright 2017-2019
//  Errorboundary.js
//  via apple-picker, mlBench, and danmckeown.info #5
import React, { Component } from "react";

class Errorboundary extends Component {
  state = {
    isError: false,
    errorMessage: ""
  };
  constructor() {
    super();
  }

  componentDidCatch(error, info) {
    console.log(error.message);
    console.log(typeof error);
    this.setState({
      isError: true, errorMessage: error.message
    });
  }

  render(props) {
    if (this.state.isError) {
      return (
        <div id="errorInfoContainer">
          <aside id="errorData">
            ERROR: {this.state.errorMessage}
          </aside>

          <style jsx global>{`
          aside#errorData {
            font-family: Futura, "Ubuntu", "Lucida Grande", "Roboto", Helvetica,
              sans-serif;
            background: #ef785d;
            padding-left: calc(3px + 1vw);
            padding-right: calc(1px + 1vw);
            padding-top: calc(1px + 0.8vw);
            padding-bottom: calc(1px + 0.6vw);
          }
          }
        `}</style>
        </div>
      );
    }
    return this.props.children;
  }
}

export default Errorboundary;
