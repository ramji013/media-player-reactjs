import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './component/player/VideoPlayer';
import AddVideo from './component/control/AddVideo';
import Home from './router/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './video-react.css';

class App extends Component {
  render(){
    return(
      <div className="container">
        <Router>
         
          <Home/>
          <Switch>
            <Route path="/" exact component={VideoPlayer}  />
            <Route path="/addVideo" component = {AddVideo}/>
            </Switch>
         </Router>
      </div>
    );
  }
}

export default App;

