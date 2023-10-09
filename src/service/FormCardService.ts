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

  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
  };

  return {
    handleSelect,
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
    leftSide,
    rightSide,
    accessToken,
    allPaths,
    path,
    form,
  };
}
export default FormCardService;
