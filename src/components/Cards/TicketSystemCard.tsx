import CardsJson from "../../assets/CardsJson.json";
import { IEventButton } from "../../interfaces/IEventButton";
import { IFormCard } from "../../interfaces/IFormCard";
import { ITextField } from "../../interfaces/ITextField";
import FormCard from "./FormCard";

function TicketSystemCard() {
  console.log("render")

  const ticketSystemCard = CardsJson.AllCards[3];
  const ticketFormCard: IFormCard = {
    title: ticketSystemCard.name,
    songDataDisplay: ticketSystemCard.data.songDataDisplay,
    color: ticketSystemCard.data.color,
    borderStyle: ticketSystemCard.data.borderStyle,
    textFields: ticketSystemCard.data.textFields as ITextField[],
    eventButtons: ticketSystemCard.data.eventButtons as IEventButton[],
    pathNeeded: ticketSystemCard.data.pathNeeded,
  };
  return (
    <>
      <FormCard
        key={ticketFormCard.title}
        title={ticketFormCard.title}
        color={ticketFormCard.color}
        borderStyle={ticketFormCard.borderStyle}
        textFields={ticketFormCard.textFields}
        eventButtons={ticketFormCard.eventButtons}
        pathNeeded={ticketFormCard.pathNeeded}
        songDataDisplay={ticketFormCard.songDataDisplay}
      />
    </>
  );
}

export default TicketSystemCard;
