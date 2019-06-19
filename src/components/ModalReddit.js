import React, { Component } from "react";

class ModalReddit extends Component {

  componentDidMount() {
    const { currentCoin } = this.props;
    const oScript = document.createElement("script");
    document.write = function (text) {
      document.getElementById("reddit").innerHTML += text;
    };
    oScript.src = `https://www.reddit.com/r/${currentCoin}.embed?limit=10`;
    document.body.appendChild(oScript);
  }

  render() {
    return <div id="reddit" />
  }
}

export default ModalReddit;
