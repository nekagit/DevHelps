import paths from "../assets/paths.json";
import { useSpotifyService } from "./SpotifyService";
const allPaths = Object.values(paths);

function FormCardService() {
  const spotifyService = useSpotifyService();
  const {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playCurrentAlbum,
    handleRefreshToken,
    logCurrentlyPlayedAlbumTracks,
    accessToken,
    createPlaylist,
    getAlbum,
    previousSong,
    addTracksToPlaylist,
    leftSide,
    leftSideAlbum,
    rightSide,
    rightSideAlbum
  } = spotifyService;
  
  const executeScriptRequest = async (
    scriptName: string,
    scriptParameter: string,
    paths: string[]
  ) => {
    try {
      console.log(scriptParameter)
      await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: scriptParameter,
          pathDev: paths[0],
          pathProj: paths[1],
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const spotifyActions = (action: string, formValue: string) => {
    if (action === "loginSpotDoc") {
      loginSpotDoc();
    }
    if (action === "nextSong") {
      nextSong();
    }
    if (action === "previousSong") {
      previousSong();
    }
    if (action === "logCurrentlyPlayedTrack") {
      logCurrentlyPlayedTrack(
      );
    }
    if (action === "logCurrentlyPlayedAlbumTracks") {
      logCurrentlyPlayedAlbumTracks();
    }
    if (action === "playCurrentAlbum") {
      playCurrentAlbum();
    }
    if (action === "playSongByName") {
      playSongByName(formValue);
    }
    if (action === "handleRefreshToken") {
      handleRefreshToken();
    }  
    if (action === "createPlaylistByName") {
      createPlaylist(formValue);
    }
    if (action === "addToTrackToPlaylistByURI") {
    addTracksToPlaylist(formValue);
    }
    if (action === "getAlbumByAlbumId") {
      getAlbum(formValue);
    }
  };

  return {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playCurrentAlbum,
    handleRefreshToken,
    spotifyActions,
    executeScriptRequest,
    allPaths,
    leftSide,leftSideAlbum,rightSide,rightSideAlbum,
    accessToken
  };
}
export default FormCardService;
