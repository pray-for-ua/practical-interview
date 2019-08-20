import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const initializeFrame = () => {
  return new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = () => resolve()
  });
}

class Player extends PureComponent {
  componentDidMount = () => {
    initializeFrame();
  }

  componentDidUpdate = () => {
    if (this.player) {
      this.player.loadVideoById(this.props.videoId);
    } else {
      this.initializePlayer();
    }
  }

  initializePlayer = () => {
    if (window.YT) {
      this.player = new window.YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height,
        width: this.props.width,
        videoId: this.props.videoId,
        events: {
          'onReady': this.onPlayerReady,
        }
      })
    }
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }  

  render() {
    const { videoId } = this.props;
    if (!videoId) {
      return <div>Please search something or select video from history</div>;
    }

    return (
      <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
    )
  }
}

Player.propTypes = {
  videoId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

Player.defaultProps = {
  width: 640,
  height: 390,
};

export default Player;
