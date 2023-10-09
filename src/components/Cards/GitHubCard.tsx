import CardsJson from "../../assets/CardsJson.json";
import { IEventButton } from "../../interfaces/IEventButton";
import { IFormCard } from "../../interfaces/IFormCard";
import { ITextField } from "../../interfaces/ITextField";
import FormCard from "./FormCard";

function GitHubCard() {
  const gitHubCard = CardsJson.AllCards[0];
  const githubFormCard: IFormCard = {
    title: gitHubCard.name,
    color: gitHubCard.data.color,
    borderStyle: gitHubCard.data.borderStyle,
    textFields: gitHubCard.data.textFields as ITextField[],
    eventButtons: gitHubCard.data.eventButtons as IEventButton[],
    pathNeeded: gitHubCard.data.pathNeeded,
  };

  return (
    <FormCard
      key={githubFormCard.title}
      title={githubFormCard.title}
      color={githubFormCard.color}
      borderStyle={githubFormCard.borderStyle}
      textFields={githubFormCard.textFields}
      eventButtons={githubFormCard.eventButtons}
      pathNeeded={githubFormCard.pathNeeded}
    />
  );
}

export default GitHubCard;
