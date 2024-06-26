import CardsJson from "../../assets/CardsJson.json";
import { IEventButton } from "../../interfaces/IEventButton";
import { IFormCard } from "../../interfaces/IFormCard";
import { ITextField } from "../../interfaces/ITextField";
import FormCard from "./FormCard";

function GitHubCard() {
  console.log("render")

  const gitHubCard = CardsJson.AllCards[0];
  const githubFormCard: IFormCard = {
    title: gitHubCard.name,
    songDataDisplay: gitHubCard.data.songDataDisplay,
    color: gitHubCard.data.color,
    borderStyle: gitHubCard.data.borderStyle,
    textFields: gitHubCard.data.textFields as ITextField[],
    eventButtons: gitHubCard.data.eventButtons as IEventButton[],
    pathNeeded: gitHubCard.data.pathNeeded,
  };
  return (
    <>
      {/* !Do Not type Prefix nk/! */}
    <FormCard
      key={githubFormCard.title}
      title={githubFormCard.title}
      color={githubFormCard.color}
      borderStyle={githubFormCard.borderStyle}
      textFields={githubFormCard.textFields}
      eventButtons={githubFormCard.eventButtons}
      pathNeeded={githubFormCard.pathNeeded}
      songDataDisplay={githubFormCard.songDataDisplay}
      />
      </>
    
  );
}

export default GitHubCard;
