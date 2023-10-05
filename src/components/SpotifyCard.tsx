import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSpotifyService } from "../service/SpotifyService";

interface IProps {
  title: string;
  path?: string;
  height?: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, color, border } = props;
  const borderStyle = "1px solid black";
  const spotifyService = useSpotifyService();
  const {
    loginSpotDoc,
    logCurrentlyPlayedTrack,
    accessToken,
    currentSong,
    nextSong,
    playSongByName,
    playAlbumById,
  } = spotifyService;
  const form = useForm({
    initialValues: {
      songName: "",
      albumId: "",
    },
  });
  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Section bg="rgba(111, 0, 0, .1)">
          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Text fw={500}> {title} </Text>
          </Flex>
          <hr />

          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <div
              style={
                accessToken
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {accessToken ? "Access Token available" : "No Access"}
            </div>

            <Button className="btn" onClick={loginSpotDoc}>
              login
            </Button>
          </Flex>
          <hr />

          <Flex
            gap="sm"
            justify="space-around"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button onClick={() => logCurrentlyPlayedTrack()}>
              Currently Played
            </Button>
            Name: {currentSong.name}
            <br />
            AlbumId: {currentSong.albumId}
            <br />
            Artist: {currentSong.artists}
            <br />
          </Flex>
          <hr />

          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button onClick={() => nextSong()}>Next Track</Button>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="songName"
              placeholder="Type something..."
              {...form.getInputProps("songName")}
            />
            <Button onClick={() => playSongByName(form.values.songName)}>
              Play Song By Name
            </Button>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="albumId"
              placeholder="Type something..."
              {...form.getInputProps("albumId")}
            />
            <Button
              className="btn"
              onClick={() => playAlbumById(form.values.albumId)}
            >
              Play Album By Id
            </Button>
          </Flex>
          <br />
        </Card.Section>
      </Card>
    </>
  );
}

export default BasicCard;
