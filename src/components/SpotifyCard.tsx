import { Button, Card, ListGroup } from "react-bootstrap";
import { useSpotifyService } from "../service/SpotifyService";

interface IProps {
  title: string;
  width: string;
  height: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, width, height, color, border } = props;
  const borderStyle = "1px solid black";
  const spotifyService = useSpotifyService();
  const { loginSpotDoc, logCurrentlyPlayedTrack, accessToken } = spotifyService;
  return (
    <>
      <Card
        style={{
          width: width,
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
            <ListGroup.Item>
              <Button className="btn" onClick={() => logCurrentlyPlayedTrack()}>
                Currently played track
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>previous song</ListGroup.Item>
            <ListGroup.Item>add to playlist</ListGroup.Item>
            <ListGroup.Item>{accessToken}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
