import './VideoList.css';
import React from 'react';
import PropTypes from 'prop-types';
import Item from './components/Item';

const VideoList = ({ videos, videoItemProps, className }) => {
    const renderedVideos = videos.map((video, i) => {
        return (
          <Item
            key={video.id.videoId + i}
            video={video}
            index={i}
            {...videoItemProps}
          />
        );
    });

    return <div className={`VideoList ${className}`}>{renderedVideos}</div>;
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  videoItemProps: PropTypes.object,
}

VideoList.defaultProps = {
  className: '',
}

export default VideoList;