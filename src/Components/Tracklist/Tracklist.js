import './Tracklist.css';
import React from 'react';
import Track from '../Track/Track'

export default class Tracklist extends React.Component {
  render() {
    if(this.props.tracks) {
      return (
        <div className="TrackList">
            {
              this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>)
            }
        </div>
      )
    }
    else {
      return <h1>Enter something dummy</h1>
    }
  }
}