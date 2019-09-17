import React, {Component} from 'react';

export default class PlayList extends Component{
      
  state = {
    lstVideoUrls: ["123"],
    addTextUrl : "",
    editIndex: -1,
    editTextUrl: ""
}

handleAddTextUrlChange = (e) => {
    this.setState({addTextUrl : e.target.value})
};

handleUpdateTextUrlChange = (e) => {
    this.setState({addTextUrl : e.target.value})
};

addVideo = () => {
    const{ lstVideoUrls, addTextUrl} = this.state;
    if(addTextUrl){
        lstVideoUrls.push(addTextUrl,1);
        this.setState({lstVideoUrls});
    }
};

deleteVideo = (urlIndex) => {
  const {lstVideoUrls} = this.state;
  lstVideoUrls.splice(urlIndex,1);
  this.setState({lstVideoUrls});
}

editVideo = (urlIndex, url) => {
    this.setState({editIndex: urlIndex, editTextUrl: url});
};

updateVideo = () => {
    const{ lstVideoUrls, editTextUrl, editIndex} = this.state;
    if(editTextUrl){
        lstVideoUrls[editIndex] = editTextUrl;
        this.setState({lstVideoUrls, editTextUrl: "", editIndex: -1})
    }
};

cancelEdit = () => {
  const {lstVideoUrls, editIndex, addTextUrl, editTextUrl} = this.state;
  return <div className="video-list-container" style={{ padding : "10px"}}>
    <div className="video-add-form">
      <label htmlFor="url">url</label>
      <input name="url" type="url" value={addTextUrl} onChange={this.handleAddTextUrlChange}/>
      <button type="button" onClick={this.addVideo}>Add Url</button>
    </div>

    <ul>
      {
        lstVideoUrls.map((url, urlIndex) => (
            <li key={url}> {
              editIndex !== urlIndex ? <span>{url}</span>:
               <input type="url" value={editTextUrl} onChange={this.handleUpdateTextUrlChange}></input> 
            }
            {
              editIndex !== urlIndex ?
              <div>
                <button onClick= { ()=> this.editVideo(urlIndex,url)}> Edit</button>
                <button onClick={ ()=> this.deleteVideo(urlIndex)}>Delete</button>
              </div>:
              <div>
                <button onClick={() => this.updateVideo(urlIndex)}>Save</button>
                <button onClick={()=> this.cancelEdit()}> Cancel</button>
                
              </div>
            }

            </li>   
        ))
      }
    </ul>

  </div>
}
}