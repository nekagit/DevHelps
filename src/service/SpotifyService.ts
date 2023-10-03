import { useMemo } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "20da193795de4266b95a81dc7c086624",
  clientSecret: "aab5a168f1d64e9484d4cee3f5c6282c",
  redirectUri: "http://localhost:3000",
});

function SpotifyService() {
  const token = useMemo(() => {
    if (spotifyApi.getAccessToken() === null) {
      const token = window.location.hash.match(/access_token=([^&]*)/);
      if (token) {
        const accessToken = token[1];
        spotifyApi.setAccessToken(accessToken);
      }
      console.log(spotifyApi.getAccessToken());
    }
  }, []);

  function loginSpotDoc() {
    const clientId = "20da193795de4266b95a81dc7c086624";
    const redirectUri = "http://localhost:5173"; // Update with your actual redirect URI
    const scope = "user-read-private user-read-email"; // Add the required scopes

    // Create the Spotify login URL
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

    // Redirect the user to the Spotify login page
    window.location.href = spotifyLoginUrl;
  }

  async function logCurrentlyPlayedTrack() {
    console.log("logCurrentlyPlayedTrack Function");
    console.log(token);
    console.log(spotifyApi.getAccessToken());
    console.log(spotifyApi.getMe());
    const artistAlbums = await spotifyApi.getArtistAlbums(
      "43ZHCT0cAZBISjO8DG9PnE"
    );
    console.log("Artist albums", artistAlbums.body);
    const currentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack();
    console.log("Current playing track", currentPlayingTrack.body);
    // Your code to log the currently played track here
  }

  // Return any functions or data you want to expose from this service
  return {
    logCurrentlyPlayedTrack,
    token,
    loginSpotDoc,
  };
}

export { SpotifyService };
