import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import '../../App.css';

export default class PlayerControl extends Component{

    play = () => {
            this.props.player.play(); 
            document.getElementById("play").disabled = true;
            document.getElementById("pause").disabled = false;
} 

    pause = () => {
            this.props.player.pause(); 
            document.getElementById("pause").disabled = true;
            document.getElementById("play").disabled = false;
    }

    load = () => {
        this.props.player.load();
        this.props.player.play();
    }

    changeVolume = (steps) => {
        return () => {
          const { player } = this.props.player.getState();
          this.props.player.volume = player.volume + steps;
        };
      }

      setMuted = () => {
        return () => {
            if(this.props.player.muted===true){
                this.props.player.muted = false;
            }
            else if(this.props.player.muted === false){
                this.props.player.muted = true;
            }
          };
      }

    render(){
        return(           
            <div className="player-control">
            <Button onClick={this.play} id="play">
                 <FontAwesomeIcon icon={Icons.faPlayCircle} size="1x"/>
             </Button>
             <Button onClick={this.pause} id="pause">
                 <FontAwesomeIcon icon={Icons.faPauseCircle} size="1x"/>
             </Button>
             <Button onClick={this.load}>
                 <FontAwesomeIcon icon={Icons.faRedo} size="1x"/>
             </Button>
             
             <Button onClick={this.changeVolume(0.1)}>
                 <FontAwesomeIcon icon={Icons.faPlus} size="1x"/>
             </Button>
             <Button onClick={this.changeVolume(-0.1)}>
                  <FontAwesomeIcon icon={Icons.faMinus} size="1x"/>
             </Button>
            <Button onClick={this.setMuted()}>
                  <FontAwesomeIcon icon={Icons.faHeadphones} size="1x"/>
             </Button>

             <Button>
                  <FontAwesomeIcon icon={Icons.faThumbsUp} size="1x"/>
             </Button>

             <Button>
                  <FontAwesomeIcon icon={Icons.faThumbsDown} size="1x"/>
             </Button>

         </div>
        )
    }
}

