import { Card, ListGroup } from "react-bootstrap";

// const SpotifyWebApi = require("spotify-web-api-node");

// // credentials are optional
// const spotifyApi = new SpotifyWebApi({
//   clientId: "20da193795de4266b95a81dc7c086624",
//   clientSecret: "aab5a168f1d64e9484d4cee3f5c6282c",
//   redirectUri: "http://localhost:5173",
// });

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
            <ListGroup.Item>Next Song</ListGroup.Item>
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
