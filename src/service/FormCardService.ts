import { useMemo } from "react";
import paths from "../assets/paths.json";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
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
    accessToken,
    currentSong,
    spotifyApi,
  } = spotifyService;

  const { leftSide, rightSide } = useMemo(() => {
    const { result, resultArray } =
      SpotifyHelpers(spotifyApi).formatSongData(currentSong);
    return {
      result,
      leftSide: resultArray
        .slice(0, resultArray.length / 2)
        .map((x) => x + "\n"),
      rightSide: resultArray
        .slice(resultArray.length / 2, resultArray.length - 1)
        .map((x) => x + "\n"),
    };
  }, [currentSong, spotifyApi]);

  const executeScriptRequest = async (
    scriptName: string,
    scriptParameter: string,
    paths: string[]
  ) => {
    console.log(scriptParameter);
    try {
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
    leftSide,
    rightSide,
    accessToken,
    allPaths,
  };
}
export default FormCardService;
