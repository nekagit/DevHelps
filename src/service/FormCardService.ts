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
    playAlbumById,
    handleRefreshToken,
    leftSide,
    rightSide,
    leftSideAlbum,
    rightSideAlbum,
    accessToken,
    createPlaylist,
    getAlbum,
    getArtist,
    searchAlbums,
    searchArtists,
    searchPlaylists,
    searchTracks,
    addTracksToPlaylist
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
    if (action === "logCurrentlyPlayedTrack") {
      logCurrentlyPlayedTrack();
    }
    if (action === "playAlbumById") {
      playAlbumById(formValue);
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
    if (action === "getArtistByArtistId") {
      getArtist(formValue);
    }
    if (action === "searchAlbumsByName") {
      searchAlbums(formValue);
    }
    if (action === "searchArtistsByName") {
      searchArtists(formValue);
    }
    if (action === "searchTracksByName") {
      searchTracks(formValue);
    }
    if (action === "searchPlaylistsByName") {
      searchPlaylists(formValue);
    }
  };

  return {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
    spotifyActions,
    executeScriptRequest,
    allPaths,
    leftSide,
    rightSide,
    leftSideAlbum, rightSideAlbum,
    accessToken
  };
}
export default FormCardService;
