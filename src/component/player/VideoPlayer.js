import React, { Component} from 'react';
import { Player, ControlBar } from 'video-react';
import PlayerControl from '../control/PlayerControl'
import PlayList from '../control/PlayList';
import '../../App.css';
import axios from 'axios';

export default class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    //alert(sources.youtube[0].url)
    this.state = {
      source:""
      //source: null
    };

  }

  updateSource = (source) => this.setState({sources : source})

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

  changeSource = (url) => {
    alert(url);
      this.setState({
          source: url
        });
        this.player.load();
        this.player.play();
    }

  render() {
    return (
      <div>
        <Player ref={player => { this.player = player }}>
          <source src={this.state.source} />
          <ControlBar autoHide={true} disableDefaultControls={true} disableCompletely={true}/>
          </Player>
          <PlayerControl player={this.player}/> 
         <PlayList player={this.player} changeSource={this.changeSource}/>
      </div>
    );
  }
}