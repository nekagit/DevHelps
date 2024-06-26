import CardsJson from "../../assets/CardsJson.json";
import { IEventButton } from "../../interfaces/IEventButton";
import { IFormCard } from "../../interfaces/IFormCard";
import { ITextField } from "../../interfaces/ITextField";
import FormCard from "./FormCard";

function NPMCard() {
  console.log("render")

  const npmCard = CardsJson.AllCards[2];
  const npmFormCard: IFormCard = {
    title: npmCard.name,
    songDataDisplay: npmCard.data.songDataDisplay,
    color: npmCard.data.color,
    borderStyle: npmCard.data.borderStyle,
    textFields: npmCard.data.textFields as ITextField[],
    eventButtons: npmCard.data.eventButtons as IEventButton[],
    pathNeeded: npmCard.data.pathNeeded,
  };
  return (
    <>
      <FormCard
        key={npmFormCard.title}
        title={npmFormCard.title}
        color={npmFormCard.color}
        borderStyle={npmFormCard.borderStyle}
        textFields={npmFormCard.textFields}
        eventButtons={npmFormCard.eventButtons}
        pathNeeded={npmFormCard.pathNeeded}
        songDataDisplay={npmFormCard.songDataDisplay}
      />
    </>
  );
}

export default NPMCard;
