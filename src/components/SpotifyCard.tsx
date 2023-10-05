import { SetStateAction, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useSpotifyService } from "../service/SpotifyService";

interface IProps {
  title: string;
  path?: string;
  height: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, height, color, border } = props;
  const [songName, setSongName] = useState("");
  const [albumId, setAlbumId] = useState("");
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
  const handleSongChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSongName(e.target.value);
  };
  const handleAlbumIdChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAlbumId(e.target.value);
  };
  return (
    <>
      <Card
        style={{
          width: "50%",
          height: height,
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <ListGroup>
            <Button className="btn" onClick={loginSpotDoc}>
              login
            </Button>
            <br />
            <Form>
              <ListGroup.Item>
                <Button
                  className="btn"
                  onClick={() => logCurrentlyPlayedTrack()}
                >
                  Currently played track
                </Button>
                <br />
                <Form.Label>Name: {currentSong.name}</Form.Label>
                <br />
                <Form.Label>AlbumId: {currentSong.albumId}</Form.Label>
                <br />
                <Form.Label>Artist: {currentSong.artists}</Form.Label>
                <br />
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn" onClick={() => nextSong()}>
                  Next Track
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group controlId="Form.SongName">
                  <Form.Label>Enter SongName:</Form.Label>
                  <Form.Control
                    type="text"
                    value={songName}
                    onChange={handleSongChange}
                    placeholder="Type something..."
                  />
                </Form.Group>
                <Button
                  className="btn"
                  onClick={() => playSongByName(songName)}
                >
                  Play Song By Name
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group controlId="Form.SongName">
                  <Form.Label>Enter AlbumId:</Form.Label>
                  <Form.Control
                    type="text"
                    value={albumId}
                    onChange={handleAlbumIdChange}
                    placeholder="Type something..."
                  />
                </Form.Group>
                <Button className="btn" onClick={() => playAlbumById(albumId)}>
                  Play Album By Id
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                style={
                  accessToken
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
              >
                {accessToken ? "Access Token available" : "No Access"}
              </ListGroup.Item>
            </Form>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
