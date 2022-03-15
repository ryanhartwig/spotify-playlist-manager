import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term)
      .then(results => {
        this.setState( {searchResults: results });
      });
  }

  // Update when finding URI values for playlistTracks
  savePlaylist() {
    let trackURIs = [];

    for(const track of this.playlistTracks) {
      trackURIs.push(track.uri);
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    if(this.state.playlistTracks.every(playlistTrack => track.id !== playlistTrack.id)) {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
    }
  }

  removeTrack(track) {
    let cutPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);

    this.setState({ playlistTracks: cutPlaylist });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults  searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
