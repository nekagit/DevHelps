import React from "react";
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
  redirectUri: "http://localhost:3000",
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
  const clientId = "20da193795de4266b95a81dc7c086624";
  const redirectUri = "http://localhost:5173"; // Update with your actual redirect URI
  const scope = "user-read-private user-read-email"; // Add the required scopes

  // Create the Spotify login URL
  const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

  // Redirect the user to the Spotify login page
  window.location.href = spotifyLoginUrl;
};
function BasicCard(props: IProps) {
  const { title, width, height, color, border } = props;
  const borderStyle = "1px solid black";
  React.useEffect(() => {
    console.log(window.location.href);
    spotifyApi.setAccessToken(regex.parse(window.location.href));
  }, []);
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
