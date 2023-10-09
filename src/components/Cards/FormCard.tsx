import {
  Badge,
  Button,
  Card,
  Flex,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { IFormCard } from "../../interfaces/IFormCard";
import FormCardService from "../../service/FormCardService";

function FormCard(props: IFormCard) {
  const {
    title,
    color,
    borderStyle,
    textFields,
    eventButtons,
    badges,
    pathNeeded,
  } = props;

  const {
    leftSide,
    rightSide,
    accessToken,
    allPaths,
    path,
    form,
    handleSelect,
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
  } = FormCardService();

  const executeScriptRequest = async (
    scriptName: string,
    scriptParameter: string,
    path: string
  ) => {
    try {
      await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: scriptParameter,
          path: path,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const executeAction = (
    action: string,
    scriptName: string,
    scriptKey: string,
    path: string
  ) => {
    const formValue = getFormValue(scriptName);
    console.log(formValue);
    if (action === "handleGitAction") {
      executeScriptRequest(scriptName, formValue, path);
    }
    if (action === "handleNPMAction") {
      executeScriptRequest(scriptKey, "", path);
    }
    if (action === "loginSpotDoc") {
      loginSpotDoc();
    }
    if (action === "nextSong") {
      nextSong();
    }
    if (action === "logCurrentlyPlayedTrack") {
      logCurrentlyPlayedTrack();
    }
    if (action === "playAlbumById") {
      playAlbumById(formValue);
    }
    if (action === "playSongByName") {
      playSongByName(formValue);
    }
    if (action === "handleRefreshToken") {
      handleRefreshToken();
    }
  };

  const getFormValue = (fieldName: string) => {
    const formFieldIndex = Object.keys(form.values).findIndex(
      (x) => x == fieldName
    );
    return Object.values(form.values)[formFieldIndex];
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
          {pathNeeded != undefined && pathNeeded ? (
            <>
              <hr />
              <Select
                key={"path"}
                label="path to DevHelps"
                placeholder="Pick value"
                value={path}
                onChange={(e: string | null) => handleSelect(e)}
                data={allPaths}
              />
            </>
          ) : (
            <></>
          )}
          <hr />
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            {badges?.map((badge) => (
              <>
                <Badge
                  key={badge.key}
                  size="xl"
                  variant="gradient"
                  gradient={
                    accessToken != ""
                      ? { from: "green", to: "green", deg: 90 }
                      : { from: "red", to: "red", deg: 90 }
                  }
                >
                  {badge.name}
                </Badge>
              </>
            ))}
          </Flex>
          <br />
          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
            style={{ width: "88%" }}
            className="scrollbar-hidden-container"
          >
            <pre>{leftSide}</pre>
            <pre>{rightSide}</pre>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            {eventButtons?.map((button) => (
              <Button
                key={button.key}
                onClick={(e) => {
                  e.preventDefault();
                  executeAction(
                    button.action,
                    button.name,
                    button.key,
                    path ?? ""
                  );
                }}
              >
                {button.label}
              </Button>
            ))}
          </Flex>
          {textFields?.map((field) => (
            <div key={field.key}>
              <hr />
              <Flex
                gap="sm"
                justify="space-around"
                align="flex-end"
                direction="row"
                wrap="wrap"
              >
                <TextInput
                  label={field.label}
                  {...form.getInputProps(field.name)}
                  placeholder={field.placeholder}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    executeAction(
                      field.button.action,
                      field.button.name,
                      field.button.key,
                      path ?? ""
                    );
                  }}
                >
                  {field.button.label}
                </Button>
              </Flex>
            </div>
          ))}
        </Card.Section>
      </Card>
    </>
  );
}

export default FormCard;
