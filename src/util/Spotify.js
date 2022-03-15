let access_token = ''
let currentUrl = window.location.href,
client_id = 'b5a9474ceaa645e797e974c555e1b3af',
scope = 'playlist-modify-private playlist-read-private playlist-modify-public',
redirect_uri = 'http://localhost:3000/',
url = 'https://accounts.spotify.com/authorize';
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
      console.log(access_token);
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

      console.log(access_token);
      return access_token;
    } 

    // access token is empty & not in url
    else { 
      window.location = url; //authorize
    }
  },

  search(term) {
    const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`
    const options = { 
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    }
    return fetch(fetchUrl, options)
      .then(response => response.json())
      .then(jsonResponse => {
        if(!jsonResponse.tracks.items.length) {
          return [];
        }
        else if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      });
  }
}

export default Spotify;