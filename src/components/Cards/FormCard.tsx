import { Card, Text } from "@mantine/core";
import { useState } from "react";
import { IFormCard } from "../../interfaces/IFormCard";
import FormCardService from "../../service/FormCardService";
import DirectorySetup from "../Inputs/directorySetup";
import EventButtons from "../Inputs/eventButtons";
import FormBadges from "../Inputs/formBadges";
import SongDataDisplay from "../Inputs/songDataDisplay";
import TextFields from "../Inputs/textFields";

function FormCard(props: IFormCard) {
  const [pathDev, setPathDev] = useState("");
  const [pathProj, setPathProj] = useState("");
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

  const { spotifyActions, executeScriptRequest, getFormValue } =
    FormCardService();

  const executeAction = (
    action: string,
    fieldName: string,
    scriptKey: string
  ) => {
    const formValue = getFormValue(fieldName);
    if (action === "handleGitAction") {
      executeScriptRequest(scriptKey, formValue, [pathDev, pathProj]);
    } else if (action === "handleNPMAction") {
      executeScriptRequest(scriptKey, "", [pathDev, pathProj]);
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
          <DirectorySetup
            pathNeeded={pathNeeded}
            pathDev={pathDev}
            pathProj={pathProj}
            setPathDev={setPathDev}
            setPathProj={setPathProj}
          />
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
