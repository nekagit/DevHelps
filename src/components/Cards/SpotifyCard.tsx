import { useSpotifyService } from "../../service/SpotifyService";

import CardsJson from "../../assets/CardsJson.json";
import FormCard from "./FormCard";

function SpotifyCard() {
  const spotifyCard = CardsJson.AllCards[1];
  const spotifyService = useSpotifyService();
  const {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    accessToken,
    currentSong,
    nextSong,
    playSongByName,
    playAlbumById,
  } = spotifyService;

  const spotifyFormCard = {
    title: spotifyCard.name,
    songDataDisplay: spotifyCard.data.songDataDisplay,
    color: spotifyCard.data.color,
    borderStyle: spotifyCard.data.borderStyle,
    textFields: spotifyCard.data.textFields,
    eventButtons: spotifyCard.data.eventButtons,
    badges: spotifyCard.data.badges,
    accessToken,
    currentSong,
    nextSong,
    playSongByName,
    playAlbumById,
    logCurrentlyPlayedTrack,
    loginSpotDoc,
  };

  return (
    <FormCard
      key={spotifyCard.name}
      title={spotifyFormCard.title}
      color={spotifyFormCard.color}
      borderStyle={spotifyFormCard.borderStyle}
      textFields={spotifyFormCard.textFields}
      eventButtons={spotifyFormCard.eventButtons}
      badges={spotifyFormCard.badges}
      songDataDisplay={spotifyFormCard.songDataDisplay}
    />
  );
}
export default SpotifyCard;
