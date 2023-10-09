import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import CardsJson from "../assets/CardsJson.json";
import paths from "../assets/paths.json";
import { Helpers } from "../helpers/Helpers";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import { useSpotifyService } from "./SpotifyService";

function FormCardService() {
  const gitHubCard = CardsJson.AllCards[0];
  const spotCard = CardsJson.AllCards[1];
  // const npmCard = CardsJson.AllCards[3];
  const allPaths = Object.values(paths);
  const spotifyService = useSpotifyService();
  const [path, setPath] = useState("");

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
    accessToken,
    currentSong,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
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

  const executeAction = (
    action: string,
    scriptName: string,
    scriptKey: string,
    path: string
  ) => {
    console.log(action, "action", "\n", scriptName, "scriptName", "\n", path);
    const formValue = getFormValue(scriptName);
    console.log(formValue);
    if (action === "handleGitAction") {
      Helpers().executeScriptRequest(scriptName, formValue, path);
    }
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

  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
  };

  const getFormValue = (fieldName: string) => {
    const formFieldIndex = Object.keys(form.values).findIndex(
      (x) => x == fieldName
    );
    return Object.values(form.values)[formFieldIndex];
  };
  return {
    handleSelect,
    executeAction,
    leftSide,
    rightSide,
    accessToken,
    allPaths,
    path,
    form,
  };
}
export default FormCardService;
