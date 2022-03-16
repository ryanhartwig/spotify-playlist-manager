import './Playlist.css';
import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = { placeholder: 'New Playlist' }
  
    this.handleNameChange = this.handleNameChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.togglePlaceholder = this.togglePlaceholder.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  togglePlaceholder() {
    let placeholderText = this.state.placeholder ? '' : 'New Playlist';
    this.setState({ placeholder: placeholderText })
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
        <input id='playlistName' placeholder={this.state.placeholder} onChange={this.handleNameChange} onFocus={this.togglePlaceholder} onBlur={this.togglePlaceholder}/>
        <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}