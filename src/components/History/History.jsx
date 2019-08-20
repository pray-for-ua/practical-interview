import './History.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VideoList from './../VideoList';

class History extends PureComponent { 
  handleDelete = (ev, video, index) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.onDelete(video.id.videoId, index);
  }

  renderControls = (video, index) => {
    return (
      <div>
        <button onClick={(ev) => this.handleDelete(ev, video, index)}>
          Delete
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="History">
        <VideoList
          className="History-video-list"
          videos={this.props.videos}
          videoItemProps={{
            className: 'History-video-item',
            withImg: false,
            onClick: this.props.onClickItem,
            onRenderControls: this.renderControls,
          }}
        />
      </div>
    );
  }
}

History.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickItem: PropTypes.func,
};

export default History;
