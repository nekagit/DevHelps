import React, { SetStateAction } from "react";
import { Card, Form, Row } from "react-bootstrap";
import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";

function App() {
  const [path, setPath] = React.useState(localStorage.getItem("path") ?? "");
  const handlePath = (e: { target: { value: SetStateAction<string> } }) => {
    setPath(e.target.value);
    localStorage.setItem("path", path);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Form>
              <Form.Group controlId="Form.SongName">
                <Form.Label>Enter Path for scripts:</Form.Label>
                <Form.Control
                  type="text"
                  value={path}
                  onChange={(e) => handlePath(e)}
                  placeholder="Type something..."
                />
              </Form.Group>
            </Form>
          </Card.Title>
          <Row>
            <GitHubCard title="Git Commands" path={path} height="100%" />
            <SpotifyCard title="SpotifyWebAPI" path={path} height="100%" />
          </Row>
          <br />
          <Row>
            <NPMCard title="NPM Commands" path={path} height="100%" />
            <TicketSystemCard title="Dev Tickets" path={path} height="100%" />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
