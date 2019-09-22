import React, { Component} from 'react';
import { Player, ControlBar } from 'video-react';
import PlayerControl from '../control/PlayerControl'
import PlayList from '../control/PlayList';
import '../../App.css';

export default class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source:"",
      id: ""
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

  changeSource = (url,id) => {
      this.setState({
          source: url,
          id: id
        });
        this.player.load();
        this.player.play();
        document.getElementById("play").disabled = true;
        document.getElementById("pause").disabled = false;
    }

  render() {
    return (
      <div>
        <Player ref={player => { this.player = player }}>
          <source src={this.state.source} />
          <ControlBar autoHide={true} disableDefaultControls={true} disableCompletely={true}/>
          </Player>
          <PlayerControl player={this.player} id={this.state.id}/> 
         <PlayList changeSource={this.changeSource}/>
      </div>
    );
  }
}