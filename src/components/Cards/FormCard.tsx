import { Card, Text } from "@mantine/core";
import { IFormCard } from "../../interfaces/IFormCard";
import FormCardService from "../../service/FormCardService";
import DirectorySetup from "../Inputs/directorySetup";
import EventButtons from "../Inputs/eventButtons";
import FormBadges from "../Inputs/formBadges";
import SongDataDisplay from "../Inputs/songDataDisplay";
import TextFields from "../Inputs/textFields";

function FormCard(props: IFormCard) {
  const {
    title,
    color,
    borderStyle,
    textFields,
    eventButtons,
    badges,
    pathNeeded,
    songDataDisplay,
  } = props;

  const {
    pathDev,
    pathProj,
    spotifyActions,
    executeScriptRequest,
    getFormValue,
  } = FormCardService();

  const executeAction = (
    action: string,
    fieldName: string,
    scriptKey: string
  ) => {
    const formValue = getFormValue(fieldName);
    if (action === "handleGitAction") {
      console.log(pathDev, pathProj);
      executeScriptRequest(scriptKey, formValue);
    } else if (action === "handleNPMAction") {
      executeScriptRequest(scriptKey, "");
    } else spotifyActions(action, formValue);
  };

  return (
    <>
      <Card
        shadow="sm"
        withBorder
        style={{
          backgroundColor: color,
          border: borderStyle,
          margin: "21px",
        }}
      >
        <Card.Section bg={color} style={{ padding: "21px" }}>
          <Text fw={500}> {title} </Text>
          <hr />
          <DirectorySetup pathNeeded={pathNeeded} />
          <FormBadges badges={badges} />
          <SongDataDisplay songDataDisplay={songDataDisplay} />
          <EventButtons
            eventButtons={eventButtons}
            executeAction={executeAction}
          />
          <TextFields textFields={textFields} executeAction={executeAction} />
        </Card.Section>
      </Card>
    </>
  );
}

export default FormCard;
