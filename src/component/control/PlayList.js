import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class PlayList extends Component{

  constructor(props){
    super(props)
    this.state = {
        lstVideoUrls : []
    };
}

componentDidMount(){
    axios.get("http://localhost:3000/youtube").then(response => {
      this.setState({lstVideoUrls: response.data})
    });
  }

  playVideo = (e) => {
    this.props.changeSource(e.target.value, e.target.id);
  }

 render(){
   return (
    <div>
<table>
<tbody>

{
  this.state.lstVideoUrls.map((data, urlIndex) => (
       <tr key={urlIndex}> <td> {
         <Button id={data.id} onClick={this.playVideo} value= {data.url} variant="primary" disabled={!data.isApproved}> Play -> {data.description}</Button>
      }
         </td>
       </tr>   
   ))
     }
      </tbody>
      </table>

    </div>
   );

 }

}