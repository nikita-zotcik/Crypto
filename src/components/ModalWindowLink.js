import React, { Component } from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class ModalWindowLink extends Component {

  render() {
    const { currentCoin } = this.props;
    return (
      <div>
        <TwitterTimelineEmbed
          sourceType={currentCoin}
          screenName={currentCoin}
          options={{
            height: 800,
            width: 600
          }}
        />
      </div>
    );
  }
}

export default ModalWindowLink;
