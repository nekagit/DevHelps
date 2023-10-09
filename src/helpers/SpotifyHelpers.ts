import SpotifyWebApi from "spotify-web-api-node";
import { IUseSpotifyCurrentSong } from "../interfaces/IUseSpotifyService";

export const SpotifyHelpers = (spotifyApi: SpotifyWebApi) => {
  const windowsUrlTokenizer = () => {
    const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
    if (windowsUrlToken) {
      const token = windowsUrlToken[1];
      spotifyApi.setAccessToken(token);
      const newToken = spotifyApi.getAccessToken();
      console.warn("token set with url", newToken);
      if (newToken) localStorage.setItem("access_token", newToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const accessToken = spotifyApi.getAccessToken();
      console.warn("accessToken", accessToken);
      if (accessToken) localStorage.setItem("access_token", accessToken);
    }
  };

  const formatSongData = (songJson: IUseSpotifyCurrentSong) => {
    const songKeys = Object.keys(songJson);
    const songValue = Object.values(songJson);
    const songs = songKeys.map((x, i) => ({ [x]: songValue[i] }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resultArray = Object.entries(songs).map(([keys, values]) => {
      if (typeof Object.values(values)[0] === "object") {
        return `${Object.keys(values)[0]}: {};`;
      }

      return `${Object.keys(values)[0]}: ${Object.values(values)[0]}`;
    });
    return { result: resultArray.join("\n"), resultArray };
  };
  return { windowsUrlTokenizer, formatSongData };
};
