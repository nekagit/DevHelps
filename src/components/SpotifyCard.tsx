import { Card, ListGroup } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

interface IProps {
  title: string;
  width: string;
  height: string;
  color?: string;
  border?: string;
}

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "20da193795de4266b95a81dc7c086624",
  clientSecret: "aab5a168f1d64e9484d4cee3f5c6282c",
  redirectUri: "http://localhost:5137",
});
// spotifyApi.setAccessToken(token);
// Get Elvis' albums
// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//   function (data) {
//     console.log("Artist albums", data.body);
//   },
//   function (err) {
//     console.error(err);
//   }
// );
const login = async () => {
  try {
    console.log("vor dem fetch");
    const response = await fetch("http://localhost:3000/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`asdf.`);
    } else {
      console.error("Error executing Git script.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
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
            <button className="btn" onClick={login}>
              login
            </button>
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
