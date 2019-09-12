import React, {Component} from 'react';
import { Player } from 'video-react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class AddVideo extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          playerSource: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4'
        };
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (this.state.playerSource !== prevState.playerSource) {
          this.player.load();
        }
      }
    
      handleValueChange = (e) => {
        const { value } = e.target;
        this.setState({
          inputVideoUrl: value
        });
      }
    
      updatePlayerInfo = () => {
        const { inputVideoUrl } = this.state;
        this.setState({
          playerSource: inputVideoUrl
        });
      }
    
      render() {
        return (
          <div>
            <div className="docs-example">
              <Form>
                <FormGroup>
                  <Label for="inputVideoUrl">Video Url</Label>
                  <Input
                    name="inputVideoUrl"
                    id="inputVideoUrl"
                    value={this.state.inputVideoUrl}
                    onChange={this.handleValueChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="button" onClick={this.updatePlayerInfo}>
                    Update
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        );
      }
}