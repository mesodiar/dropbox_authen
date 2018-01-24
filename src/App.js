import React, { Component } from 'react'
import { Dropbox } from 'dropbox';
import { parseQueryString } from './utils'


class App extends Component {
  onclick = () => {
    console.log("Success!", Dropbox)
    const CLIENT_ID = 'XXXXXXXXXXX'

    if (isAuthenticated()) {
      const dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
      dbx.filesListFolder({path: ''})
        .then(function(response) {
            console.log('response', response)
           })
      .catch(function(error) {
          console.error(error);
          });
    } else {
      const dbx = new Dropbox({ clientId: CLIENT_ID });
      const authUrl = dbx.getAuthenticationUrl('http://localhost:3000/');
      window.location.replace(authUrl)
    }
}

  render() {
    return (
      <div className="App">
        <button onClick={this.onclick}>Click me</button>
      </div>
    );
  }
}

function getAccessTokenFromUrl() {
     return parseQueryString(window.location.hash).access_token
}
function isAuthenticated() {
      return !!getAccessTokenFromUrl();
}

export default App;
