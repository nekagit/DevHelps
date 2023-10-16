import CardsJson from "../../assets/CardsJson.json";
import FormCard from "./FormCard";

const spotifyCard = CardsJson.AllCards[1];
function SpotifyCard() {
  console.log("render")
  
 
  const spotifyFormCard = {
    title: spotifyCard.name,
    songDataDisplay: spotifyCard.data.songDataDisplay,
    color: spotifyCard.data.color,
    borderStyle: spotifyCard.data.borderStyle,
    textFields: spotifyCard.data.textFields,
    eventButtons: spotifyCard.data.eventButtons,
    badges: spotifyCard.data.badges,
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
