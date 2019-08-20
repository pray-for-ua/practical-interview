import './Item.css';
import React from 'react';
import PropTypes from 'prop-types';

const VideoItem = ({
  video,
  onClick,
  index,
  withImg,
  onClickPlayBtn,
  onRenderControls,
  className,
}) => {
  const handleClick = () => {
    onClick(video);
  }

  const handlePlayVideo = () => {
    onClickPlayBtn(video);
  }

  return (
    <div className={`VideoItem ${className}`} onClick={handleClick}>
      {
        withImg &&
        <img
          className='VideoItem-image'
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.description}
        />
      }
      <div className='VideoItem-title'>{video.snippet.title}</div>
      <div className='VideoItem-button'>
        {
          onRenderControls(video, index) ||
          <button onClick={handlePlayVideo}>Play</button>
        }
      </div>
    </div>
  )
};

VideoItem.propsTypes = {
  video: PropTypes.object,
  onClick: PropTypes.func,
  index: PropTypes.number,
  onClickPlayBtn: PropTypes.func,
  onRenderControls: PropTypes.func,
  withoutImg: PropTypes.bool,
  className: PropTypes.string,
}

VideoItem.defaultProps = {
  className: '',
  withImg: true,
  onRenderControls: () => null,
  onClick: () => {},
  onClickPlayBtn: () => {},
};

export default VideoItem;
