import {
  Badge,
  Button,
  Card,
  Flex,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import CardsJson from "../../assets/CardsJson.json";
import paths from "../../assets/paths.json";
import { Helpers } from "../../helpers/Helpers";
import { SpotifyHelpers } from "../../helpers/SpotifyHelpers";
import { IFormCard } from "../../interfaces/IFormCard";
import { useSpotifyService } from "../../service/SpotifyService";
import GitHubCard from "./GitHubCard";

function FormCard(props: IFormCard) {
  const gitHubCard = CardsJson.AllCards[0];
  const allPaths = Object.values(paths);
  const spotifyService = useSpotifyService();
  const [path, setPath] = useState("");

  const form = useForm({
    initialValues: {
      path: "",
      ...Helpers().getInitialObject(gitHubCard.data.textFields),
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
  } = props;
  const {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    accessToken,
    currentSong,
    nextSong,
    playSongByName,
    playAlbumById,
    handleRefreshToken,
  } = spotifyService;
  const { leftSide, rightSide } = useMemo(() => {
    const { result, resultArray } =
      SpotifyHelpers(SpotifyWebApi).formatSongData(currentSong);
    return {
      result,
      leftSide: resultArray
        .slice(0, resultArray.length / 2)
        .map((x) => x + "\n"),
      rightSide: resultArray
        .slice(resultArray.length / 2, resultArray.length - 1)
        .map((x) => x + "\n"),
    };
  }, [currentSong]);
  const executeAction = (
    action: string,
    scriptName: string,
    currentValue: string,
    path: string
  ) => {
    if (action === "handleGitAction") {
      GitHubCard().handleGitAction(scriptName, currentValue, path);
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
    if (action === "playAlbumByName") {
      playAlbumById(currentValue);
    }
    if (action === "playSongByName") {
      playSongByName(currentValue);
    }
    if (action === "handleRefreshToken") {
      handleRefreshToken();
    }
  };

  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
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
          {pathNeeded != undefined && pathNeeded == true ? (
            <>
              <hr />
              <Select
                key={"path"}
                label="path"
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
                  executeAction(button.action, button.name, "", path ?? "");
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
                      getFormValue(field.name),
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
