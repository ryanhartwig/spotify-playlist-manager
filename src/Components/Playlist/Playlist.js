import './Playlist.css';
import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleNameChange = this.handleNameChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  checkInput(e) {
    let inputField = document.getElementById('playlistName');
    if(!inputField.value.length) {
      inputField.focus();
      return;
    }

    this.props.onSave();
  }

  render() {
    return (
      <div className="Playlist">
        <input id='playlistName' placeholder={this.props.playlistName} onChange={this.handleNameChange}/>
        <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={this.checkInput}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}