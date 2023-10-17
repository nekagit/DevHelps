import SpotifyWebApi from "spotify-web-api-node";
import spotifyCredentials from "../assets/SpotifyCredentials.json";
import { useEffect, useMemo } from "react";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";

function SpotifyLoginService() {
    const { clientId, redirectUri, clientSecret,scope } = spotifyCredentials;
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;
    const accessToken = useMemo(() => {
        return localStorage.getItem("access_token") != null ? localStorage.getItem("access_token") : ""
    }, [])
    
    const goOutAccessToken = accessToken != null ? accessToken : ""
    const spotifyApi: SpotifyWebApi = useMemo(() => {
        return new SpotifyWebApi({
          clientId: clientId,
          clientSecret: clientSecret,
          redirectUri: redirectUri,
          accessToken: goOutAccessToken 
        });
    }, []);

    useEffect(() => {
        const currentToken = localStorage.getItem("access_token") ?? ""
        if(currentToken != "") {
          console.log("status quo, accessToken")
        } else {
          SpotifyHelpers().windowsUrlTokenizer();
          const storageAccessToken = localStorage.getItem("access_token") ?? "";
          console.log("windowUrltokenizeser", storageAccessToken)
      
        }
      }, []);

      const loginSpotDoc = () => {
        window.location.href = spotifyLoginUrl;
      };
      
      const handleRefreshToken = () => {
        localStorage.removeItem("access_token");
        spotifyApi.setAccessToken("");
        window.location.reload()

      };
      
    return {spotifyApi, loginSpotDoc, handleRefreshToken, goOutAccessToken}
}
export default SpotifyLoginService