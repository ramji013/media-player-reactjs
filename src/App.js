import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './component/player/VideoPlayer';
import AddMedia from './component/control/AddMedia';
import Home from './router/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './video-react.css';

class App extends Component {
  render(){
    return(
      <Router>
      
        <VideoPlayer/>
      
      </Router>
    );
  }
}

export default App;

