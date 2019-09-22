import React, {Component} from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import '../../App.css';
import axios from 'axios';

export default class PlayerControl extends Component{

    constructor(props){
        super(props)
        this.state = {
            currentTime : 0,
            like : 0,
            unlike: 0
        };
    }

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

      changeCurrentTime = (seconds) =>{
        return () => {
            const { player } = this.props.player.getState();
            return player.currentTime + seconds;
          };
      }

      loadLikeUnLike = () => {
        var id = this.props.id
        var data = {}
        axios.get('http://localhost:3000/youtube/'+id).then( res =>{
            data = res.data;
            this.setState({likes : data.likes, unlike: data.unlike})
      });
      }
      
      like = () => {
          var id = this.props.id
          var data = {}
          axios.get('http://localhost:3000/youtube/'+id).then( res =>{
              data = res.data;
              data.likes = data.likes + 1;
              this.setState({like : data.likes});
              axios.put('http://localhost:3000/youtube/'+id, data).then(response => {
                    console.log("updated likes..." + response.data)
              })
          })
      }

      unlike = () => {
        var id = this.props.id
        var data = {}
        axios.get('http://localhost:3000/youtube/'+id).then( res =>{
            data = res.data;
            data.dislikes = data.dislikes + 1;
            this.setState({unlike : data.dislikes});
            axios.put('http://localhost:3000/youtube/'+id, data).then(response => {
                console.log("updated dislikes..." + response.data)
            })
        })
    }

    render(){
        return(           
            <div className="video-controls">
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

             <Button onClick={this.like}>
                  <FontAwesomeIcon icon={Icons.faThumbsUp} size="1x"/>
                  <label>{this.state.like}</label>
             </Button>

             <Button onClick={this.unLike}>
                  <FontAwesomeIcon icon={Icons.faThumbsDown} size="1x"/>
                  <label>{this.state.unlike}</label>
             </Button>

             <ProgressBar now={60} srOnly />
             <div className='progress'>
  <div className='progress-bar'
       role='progressbar'
       aria-valuenow='70'
       aria-valuemin='0'
       aria-valuemax='100'
       style={{width: '70%'}}>
    <span className='sr-only'>70% Complete</span>
  </div>
</div>
         </div>
        )
    }
}

