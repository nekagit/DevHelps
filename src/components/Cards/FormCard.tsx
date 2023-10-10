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
    songDataDisplay,
  } = props;

  const {
    leftSide,
    rightSide,
    accessToken,
    allPaths,
    pathDev,
    pathProj,
    form,
    handleSelectDev,
    handleSelectProj,
    spotifyActions,
    executeScriptRequest,
    getFormValue,
  } = FormCardService();

  const executeAction = (
    action: string,
    fieldName: string,
    scriptKey: string,
    pathDev: string,
    pathProj: string
  ) => {
    const formValue = getFormValue(fieldName);
    if (action === "handleGitAction") {
      executeScriptRequest(scriptKey, formValue, [pathDev, pathProj]);
    } else if (action === "handleNPMAction") {
      console.log(pathDev, pathProj);
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
          {pathNeeded != undefined && pathNeeded ? (
            <>
              <Select
                key={"pathDev"}
                label="path to my DevHelps"
                placeholder="Pick value"
                value={pathDev}
                onChange={(e: string | null) => handleSelectDev(e)}
                data={allPaths}
              />
              <Select
                key={"pathProj"}
                label="path your Project"
                placeholder="Pick value"
                value={pathProj}
                onChange={(e: string | null) => handleSelectProj(e)}
                data={allPaths}
              />
              {/* <TextInput name="newPath" {...form.getInputProps("newPath")} />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddingPath("newPath");
                }}
              >
                Add Path
              </Button> */}
            </>
          ) : (
            <></>
          )}
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
          {songDataDisplay ? (
            <>
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
            </>
          ) : (
            <></>
          )}
          <br />
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            {eventButtons?.map((button) => (
              <>
                <Button
                  key={button.key}
                  onClick={(e) => {
                    e.preventDefault();
                    executeAction(
                      button.action,
                      button.key,
                      button.key,
                      pathDev,
                      pathProj ?? ""
                    );
                  }}
                >
                  {button.label}
                </Button>
              </>
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
                      field.name,
                      field.button.key,
                      pathDev,
                      pathProj ?? ""
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
