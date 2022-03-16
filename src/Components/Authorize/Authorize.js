import React from 'react';
import './Authorize.css';

let client_id = 'b5a9474ceaa645e797e974c555e1b3af';
let scope = 'playlist-modify-private playlist-read-private playlist-modify-public';
// redirect uris
// http://rh_jamming.surge.sh or http://localhost:3000/

let redirect_uri = 'http://localhost:3000/';
// Auth url & query params

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
//url += '&show_dialog=true';

class Authorize extends React.Component {
  constructor(props) {
    super(props);

    this.getAuthorization = this.getAuthorization.bind(this);
  }

  getAuthorization(e) {
    window.location = url; //authorize
  }

  overlay() {
    if (!this.props.authorized) {
      document.body.style.overflow = 'hidden';
      return (
        <div id='authOverlay'>
          <div id="authBox">
            <h2>You'll need to authorize with Spotify to use this app.</h2>
            <button id="authButton" onClick={this.getAuthorization}>Authorize</button>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.overlay();
  }
}

export default Authorize;