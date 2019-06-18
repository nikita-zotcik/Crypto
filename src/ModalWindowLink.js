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
            height: 600,
            width: 300
          }}
        />
      </div>
    );
  }
}

export default ModalWindowLink;
