import { Button, Card, ListGroup } from "react-bootstrap";
import { SpotifyService } from "../service/SpotifyService";

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
            <Button className="btn" onClick={SpotifyService.loginSpotDoc}>
              login
            </Button>
            <ListGroup.Item>
              <Button
                className="btn"
                onClick={SpotifyService.logCurrentlyPlayedTrack}
              >
                Currently played track
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>previous song</ListGroup.Item>
            <ListGroup.Item>add to playlist</ListGroup.Item>
            <ListGroup.Item>
              show me all details and descriptions
            </ListGroup.Item>
            <ListGroup.Item>fave</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
