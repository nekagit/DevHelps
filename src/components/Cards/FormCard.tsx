import { Card, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import CardsJson from "../../assets/CardsJson.json";
import { Helpers } from "../../helpers/Helpers";
import { IFormCard } from "../../interfaces/IFormCard";
import FormCardService from "../../service/FormCardService";
import DirectorySetup from "../Inputs/directorySetup";
import EventButtons from "../Inputs/eventButtons";
import FormBadges from "../Inputs/formBadges";
import SongDataDisplay from "../Inputs/songDataDisplay";
import TextFields from "../Inputs/textFields";

const gitHubCard = CardsJson.AllCards[0];
const spotCard = CardsJson.AllCards[1];
const npmCard = CardsJson.AllCards[2];

function FormCard(props: IFormCard) {
  console.log("render")
  const [pathDev, setPathDev] = useState("C:\\Users\\NenadKalicanin\\Desktop\\Git\\DevHelps\\DevHelps");
  const [pathProj, setPathProj] = useState("C:\\Users\\NenadKalicanin\\Desktop\\Git\\PBD\\src\\pbd.core.frontend-react");
  const form = useForm({
    initialValues: {
      path: "",
      ...Helpers().getInitialObject(gitHubCard.data.textFields),
      ...Helpers().getInitialObject(spotCard.data.textFields),
      ...Helpers().getInitialObject(npmCard.data.textFields),
    },
  });
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


  const { spotifyActions, 
    executeScriptRequest,
     allPaths, accessToken, leftSide, leftSideAlbum, rightSide, rightSideAlbum } = FormCardService();
     
     const getFormValue = (fieldName: string): string => {
      const formFieldIndex = Object.keys(form.values).findIndex(
        (x) => x == fieldName
      );
      return Object.values(form.values)[formFieldIndex];
    };
  
  const executeAction = async (
    action: string,
    fieldName: string,
    scriptKey: string
  ) => {
    const formValue = getFormValue(fieldName);
    if (action === "handleGitAction") {
      executeScriptRequest(scriptKey, formValue, [pathDev, pathProj]);
    } else if (action === "handleNPMAction") {
      executeScriptRequest(scriptKey,  formValue, [pathDev, pathProj]);
    } else if( action === "handleTicketAction") {
      try {
        await fetch("http://localhost:3000/loginQm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }else if(action =="handleSetPath"){
      setPathDev ("C:\\Users\\NenadKalicanin\\Desktop\\Git\\DevHelps\\DevHelps");
      setPathProj ("C:\\Users\\NenadKalicanin\\Desktop\\Git\\PBD\\src\\pbd.core.frontend-react")
    }
     else {
      spotifyActions(action, formValue);

    }
  };

  return (
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
            allPaths={allPaths}
          />
          <FormBadges badges={badges} accessToken={accessToken ?? ""} />
          <SongDataDisplay songDataDisplay={songDataDisplay} leftSide={leftSide} rightSide={rightSide} leftSideAlbum={leftSideAlbum} rightSideAlbum={rightSideAlbum} />
          <EventButtons
            eventButtons={eventButtons}
            executeAction={executeAction}
          />
          <TextFields
            textFields={textFields}
            executeAction={executeAction}
            form={form}
          />
        </Card.Section>
      </Card>
  );
}

export default FormCard;
