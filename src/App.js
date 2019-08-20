import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Search from './components/Search';
import History from './components/History';
import Player from './components/Player';

axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';

axios.defaults.params = {
  key: 'AIzaSyA9lfILD4T7dw8w0IOkZze161x-oMG8Puk',
  maxResult: 5,
  part: 'snippet'
};


export default class App extends Component {
  constructor(props) {
    super(props);

    const store = JSON.parse(localStorage.getItem('store'));
    
    this.state = {
      videoId: null,
      videos: (store && store.videos) || [],
    };
  }

  handlePlayVideo = (video) => {
    this.setState({
      videoId: video.id.videoId,
      videos: [
        video,
        ...this.state.videos,
      ],
    }, () => {
      this.saveToLocalStorage();
    });
  }

  saveToLocalStorage = () => {
    localStorage.setItem('store', JSON.stringify({ videos: this.state.videos }));
  }

  removeFromLocalStorage = (id, index) => {
    const videos = this.state.videos.filter((video, i) => i !== index);

    this.setState({
      videos,
    }, () => this.saveToLocalStorage());
  }

  render() {
    const { videoId, videos } = this.state;

    return (
      <div className="App">
        <div className="Grid">
          <div className="Item">
            <Search onClickPlayVideo={this.handlePlayVideo} />
          </div>
        </div>
        <div className="Grid">
          <div className="Item">
            <History
              videos={videos}
              onDelete={this.removeFromLocalStorage}
              onClickItem={this.handlePlayVideo}
            />
          </div>
          <div className="Item">
            <Player videoId={videoId}/>
          </div>
        </div>
      </div>
    );
  }
}
