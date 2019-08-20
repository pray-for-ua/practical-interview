import './Search.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import VideoList from './../VideoList';

const SEARCH_TIMER = 1000;

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      videos: [],
      isOpenSelectZone: false
    };
    this.timeout = null;
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    console.log('Search mounted');
  }

  componentDidUpdate = () => {
    console.log('Search did update');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  

  handleSearch = (value) => {
    axios.get('/search', { params: { q: value, type: 'video' } }).then(res => {
      this.setState({
        ...this.state,
        videos: res.data.items,
        isOpenSelectZone: true,
      })
    })
  }

  handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.handleSearch(value);
    }, SEARCH_TIMER);
  }

  handleVideoSelect = (video) => {
    this.setState({ isOpenSelectZone: false });
    this.props.onClickPlayVideo(video);
  }

  handleClickOutside = (e) => {
    if (this.searchRef && !this.searchRef.contains(e.target)) {
      this.setState({ isOpenSelectZone: false });
    }
  }

  render() {
    return (
      <div className="Search" ref={(node) => { this.searchRef = node }}>
        <div className="Search-wrapper">
          <form action="#" onSubmit={this.handleSearch}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
          {
            this.state.isOpenSelectZone &&
            <VideoList
              className="Search-VideoList"
              videos={this.state.videos}
              videoItemProps={{
                onClickPlayBtn: this.handleVideoSelect,
              }}
            />
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onClickPlayVideo: PropTypes.func,
};

Search.defaultProps = {
  onClickPlayVideo: () => {},
};

export default Search;
