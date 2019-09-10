import React, {Component} from 'react';

  

export default class PlayList extends Component{
      
  changeSource=(name) => {
    return () => {
      this.setState({
        source: this.props.sources[name]
      });
      this.props.player.load();
      this.props.updateSource(name);
    };
  }

  render(){
      return(
        <li>
              <div>
                
                    
              </div>
    </li>
      );
  }
}