import { IUseSpotifyCurrentSong } from "../interfaces/IUseSpotifyService";

export const SpotifyHelpers = () => {
  const formatSongData = (songJson: any) => {
  console.log("render")
  const songKeys = Object.keys(songJson);
    const songValue = Object.values(songJson);
    const songs = songKeys.map((x, i) => ({ [x]: songValue[i] }));
    console.log(songs, "songs")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resultArray = Object.entries(songs).map(([keys, values]) => {
      if (typeof Object.values(values)[0] === "object") {
        return `${Object.keys(values)[0]}: {};`;
      }

      return `${Object.keys(values)[0]}: ${Object.values(values)[0]}`;
    });
    return { result: resultArray.join("\n"), resultArray };
  };
  
  const windowsUrlTokenizer = () => {
    const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
    if (windowsUrlToken) {
      const token = windowsUrlToken[1];
      window.location.reload()
  
      if (token != "") localStorage.setItem("access_token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
       localStorage.setItem("access_token", "");
    }
  };
  
  return { formatSongData, windowsUrlTokenizer };
};
