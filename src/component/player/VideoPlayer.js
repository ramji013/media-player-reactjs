import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import PlayerControl from '../control/PlayerControl'
import PlayList from '../control/PlayList';
import '../../App.css';

const sources = {
  "youtube" :   [ {
    "title" : "sintelTrailer",
    "url" : 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    "likes" : 0,
    "dislikes" : 1
  },
  {
    "title" : "bunnyTrailer",
    "url" : "http://media.w3.org/2010/05/bunny/trailer.mp4",
    "likes" : 0,
    "dislikes" : 1
  },
  {
    "title" : "bunnyMovie",
    "url" : "http://media.w3.org/2010/05/bunny/movie.mp4",
    "likes" : 0,
    "dislikes" : 1
  }
]
};

export default class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    //alert(sources.youtube[0].url)
    this.state = {
      source:'http://media.w3.org/2010/05/sintel/trailer.mp4'
      //source: null
    };

  }

  updateSource = (source) => this.setState({sources : source.youtube})

  componentDidMount = () => {
       fetch('http://localhost:3000/youtube').then((data) => { return data.json()}).then((json) => {
      alert(json[0].url);
      this.setState({source : 'http://media.w3.org/2010/05/sintel/trailer.mp4'})
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }).catch(console.log);
  }
  handleStateChange = (state) => {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  changeCurrentTime = (seconds) =>{
    return () => {
        const { player } = this.player.getState();
        this.player.seek(player.currentTime + seconds);
      };
  }

  seek = (seconds) => {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate = (steps) => {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  render() {
    return (
      <div>
        <Player ref={player => { this.player = player }}>
          <source src={this.state.source} />
          <ControlBar autoHide={true} disableDefaultControls={true} disableCompletely={true}/>
          
        </Player>

          <PlayerControl player={this.player}/> 
          <PlayList updateSource = {this.updateSource} sources = {this.sources} player={this.player}/>
        
      </div>
    );
  }
}