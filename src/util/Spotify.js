let access_token = ''
let currentUrl = window.location.href,
client_id = 'b5a9474ceaa645e797e974c555e1b3af',
scope = 'playlist-modify-private playlist-read-private playlist-modify-public';
// redirect uris
// http://rh_jamming.surge.sh or http://localhost:3000/

let redirect_uri = 'http://rh_jamming.surge.sh';
// Auth url & query params
let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&show_dialog=true';

const accessRegex = /access_token=([^&]*)/;
const expireRegex = /expires_in=([^&]*)/;

const Spotify = { 
  getAccessToken() {
    // access token already exists
    if(access_token) {
      return access_token;
    }
  
    // access token is empty but in the url
    else if(currentUrl.match(accessRegex)) {
      access_token = currentUrl.match(accessRegex)[1];
      let expiresIn = Number(currentUrl.match(expireRegex)[1]);
      setTimeout(() => {
        access_token = '';
      }, expiresIn*1000)
      window.history.pushState('Access Token', null, '/');

      return access_token;
    } 

    // access token is empty & not in url
    else { 
      window.location = url; //authorize
    }
  },

  async search(term) {
    if(term === '') {
      return Promise.reject('empty');
    }
    const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`
    const options = { 
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    }
    const response = await fetch(fetchUrl, options);
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks.items.length) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs) {
      return;
    }

    const access_token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${access_token}` };
    const baseURL = 'https://api.spotify.com/v1';

    // Get request userID
    const userIdResponse = await fetch(`${baseURL}/me`, { headers: headers });
    const userIdJSON = await userIdResponse.json();
    const userID = userIdJSON.id;

    // Post request playlistID
    let options = { 
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ name: playlistName })
    }

    const playlistIdResponse = await fetch(`${baseURL}/users/${userID}/playlists`, options);
    const playlistIdJSON = await playlistIdResponse.json();
    
    let playlistID = playlistIdJSON.id;
    console.log(`playlistID = ${playlistID}
    playlistIdJSON = ${playlistIdJSON}`)


    // Post request playlist tracks
    return await fetch(`${baseURL}/playlists/${playlistID}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        uris: trackURIs
      })
    })
    //const playlistTracksJson = await playlistTracksResponse.json();
    // playlistID = playlistTracksJson.id; ?? 
  }
}

export default Spotify;