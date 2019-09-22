import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

export default class AddVideo extends Component{
   
  state = {
    lstVideoUrls : [],
    addTextUrl : "",
    editIndex: -1,
    editTextUrl: "",
    addDescription : "",
    editDescription : ""
}

componentDidMount(){
  axios.get("http://localhost:3000/youtube").then(response => {
    this.setState({lstVideoUrls: response.data})
  });
}

handleAddTextUrlChange = (e) => {
    this.setState({addTextUrl : e.target.value})
};

handleUpdateTextUrlChange = (e) => {
    this.setState({editTextUrl : e.target.value})
};

handleAddDescription = (e) => {
  this.setState({addDescription : e.target.value})
};

handleUpdateDescription = (e) => {
  this.setState({editDescription : e.target.value})
};

getId = () =>  { const min = 1;
const max = 100;
const rand = Math.round(min + Math.random() * (max - min));
return rand;
}

addVideo = () => {
    const{ addTextUrl, addDescription} = this.state;
    if(addTextUrl){
      const postData = {
         "description" : addDescription,
         "url" : addTextUrl,
         "isApproved" : false,
         "likes" : 0,
         "dislikes" : 0,
         "id" : this.getId()
      }
      
      axios.post('http://localhost:3000/youtube', postData).then(res => {
        this.state.lstVideoUrls.push(postData);
      }
      );

      axios.get('http://localhost:3000/youtube').then(response => {
        this.setState({lstVideoUrls : response.data, addTextUrl: "", addDescription : ""});
      });
        
    }
};

deleteVideo = (urlIndex, id) => {
  const {lstVideoUrls} = this.state;
  lstVideoUrls.splice(urlIndex,1);
  this.setState({lstVideoUrls});
  axios.delete('http://localhost:3000/youtube/'+id).then(res =>{
    console.log("deleted data")
  });
}

approveVideo = (id, urlIndex) => {
  const {lstVideoUrls} = this.state;
  var approvePlayList = lstVideoUrls[urlIndex];
  approvePlayList.isApproved = true;

  axios.put('http://localhost:3000/youtube/'+id, approvePlayList).then(res => {
    console.log("updated the approval flag")
    lstVideoUrls[urlIndex].isApproved = true;
    this.setState({lstVideoUrls})
  }).catch(error => {
   console.log(error.response)
 });
}

editVideo = (urlIndex, url) => {
    this.setState({editIndex: urlIndex, editTextUrl: url});
};

updateVideo = (urlIndex,id) => {
    const{lstVideoUrls,editTextUrl} = this.state;
   
    if(editTextUrl){
        lstVideoUrls[urlIndex].url = editTextUrl;
        axios.put('http://localhost:3000/youtube/'+id, lstVideoUrls[urlIndex]).then(res => {
            console.log("updated video url .... ")
            this.setState({lstVideoUrls, editTextUrl: "", editIndex: -1})
        });   
    }
};

cancelEdit = () => {
  this.setState({editTextUrl: "", editIndex:-1});
};

render(){
  const {lstVideoUrls, editIndex, addTextUrl, editTextUrl, addDescription} = this.state;
  return <div className="video-list-container" style={{ padding : "10px"}}>
    <div className="video-add-form">
      <table>
        <tbody>
          <tr><td><label htmlFor="url">Enter Url</label></td>
          <td><input name="url" type="url" value={addTextUrl} onChange={this.handleAddTextUrlChange}/></td></tr>
          <tr><td><label htmlFor="description">Enter Description</label></td>
          <td><input name="description" type="description" value={addDescription} onChange={this.handleAddDescription}/></td></tr>
          <button type="button" onClick={this.addVideo}>Add Url</button>
        </tbody>
      </table>
    </div>
`   <table>
    
    <thead>
      <th>S.no</th>
      <th>Url</th>
      <th>Description</th>
      <th>Action</th>
      </thead>
      <tbody>
    {
      
       lstVideoUrls.map((data, urlIndex) => (
                 
           <tr key={urlIndex}> <td>{urlIndex+1}</td> <td> {
              editIndex !== urlIndex ? <span>{data.url}</span>:
              <input type="url" value={editTextUrl} onChange={this.handleUpdateTextUrlChange}></input>
           }
              </td>
              <td>{data.description}</td>
           <td className="btn_space_left btn_space_right">
            {
              editIndex !== urlIndex ?
              <div>
                <button onClick= { ()=> this.editVideo(urlIndex,data.url)}> Edit</button>
                <button onClick={ ()=> this.deleteVideo(urlIndex, data.id)}>Delete</button>
                <button onClick={ ()=> this.approveVideo(data.id,urlIndex)} disabled={data.isApproved}>Approve</button>
              </div>:
              <div>
                <button onClick={() => this.updateVideo(urlIndex, data.id)}>Save</button>
                <button onClick={()=> this.cancelEdit()}> Cancel</button>
                
              </div>
            }
            </td>
            </tr>   
        ))
          }
          </tbody>
          </table>
  </div>
}
}