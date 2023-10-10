import { useForm } from "@mantine/form";
import { useMemo, useRef, useState } from "react";
import CardsJson from "../assets/CardsJson.json";
import paths from "../assets/paths.json";
import { Helpers } from "../helpers/Helpers";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import { useSpotifyService } from "./SpotifyService";
function FormCardService() {
  const gitHubCard = CardsJson.AllCards[0];
  const spotCard = CardsJson.AllCards[1];
  const allPaths = Object.values(paths);
  const spotifyService = useSpotifyService();
  const [pathDev, setPathDev] = useState("");
  const [pathProj, setPathProj] = useState("");
  const folderInput = useRef(null);
  const form = useForm({
    initialValues: {
      path: "",
      ...Helpers().getInitialObject(gitHubCard.data.textFields),
      ...Helpers().getInitialObject(spotCard.data.textFields),
    },
  });

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

  const handleSelectDev = (e: string | null) => {
    setPathDev(e ?? "");
  };
  const handleSelectProj = (e: string | null) => {
    setPathProj(e ?? "");
  };

  const executeScriptRequest = async (
    scriptName: string,
    scriptParameter: string,
    paths: string[]
  ) => {
    console.log(paths[0]);
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

  const getFormValue = (fieldName: string) => {
    const formFieldIndex = Object.keys(form.values).findIndex(
      (x) => x == fieldName
    );
    return Object.values(form.values)[formFieldIndex];
  };

  const handleAddingPath = (fieldName: string) => {
    const formValue = getFormValue(fieldName);
    console.log(formValue);
  };

  return {
    handleSelectDev,
    handleSelectProj,
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
    spotifyActions,
    executeScriptRequest,
    getFormValue,
    handleAddingPath,
    leftSide,
    rightSide,
    accessToken,
    allPaths,
    pathDev,
    pathProj,
    folderInput,
    form,
  };
}
export default FormCardService;
