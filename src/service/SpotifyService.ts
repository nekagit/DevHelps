import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// Define the interface for the SpotifyService
interface IUseSpotifyService {
  logCurrentlyPlayedTrack: () => Promise<void>;
  accessToken: string | null;
  loginSpotDoc: () => void;
}

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "20da193795de4266b95a81dc7c086624",
  clientSecret: "aab5a168f1d64e9484d4cee3f5c6282c",
  redirectUri: "http://localhost:3000",
});
const clientId = "20da193795de4266b95a81dc7c086624";
const redirectUri = "http://localhost:5173"; // Update with your actual redirect URI
const scopes = ["user-read-playback-state", "other-scopes-if-needed"]; // Add your required scopes
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, "");
const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

function useSpotifyService(): IUseSpotifyService {
  useEffect(() => {
    const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
    if (windowsUrlToken) {
      const token = windowsUrlToken[1];
      spotifyApi.setAccessToken(token);
      console.warn("token set", spotifyApi.getAccessToken());

      localStorage.setItem("access_token", token);
      // Clear the access token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      spotifyApi.setAccessToken(accessToken ?? "");
      console.warn("token set", spotifyApi.getAccessToken());
    }
  });

  const accessToken = React.useMemo(() => {
    const spotifyToken = spotifyApi.getAccessToken();
    const localToken = localStorage.getItem("access_token");
    const currentToken = spotifyToken ?? localToken;
    return currentToken;
  }, []);

  const loginSpotDoc = () => {
    if (accessToken == null) {
      // Redirect the user to the Spotify login page
      window.location.href = authorizeURL;
      window.location.href = spotifyLoginUrl;
    } else {
      console.log("already logged in");
    }
  };

  const logCurrentlyPlayedTrack = async () => {
    console.log("logCurrentlyPlayedTrack Function");
    console.log(spotifyApi.getAccessToken());
    try {
      const currentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack();
      console.log("Current playing track", currentPlayingTrack.body);
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    logCurrentlyPlayedTrack,
    accessToken,
    loginSpotDoc,
  };
}

export { useSpotifyService };
export type { IUseSpotifyService };
