import { Card, Row } from "react-bootstrap";
import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";

function App() {
  return (
    <>
      <Card>
        <Card.Body>
          
        <Row>
          <GitHubCard title="Git Commands" width="50%" height="100%" />
          <SpotifyCard title="SpotifyWebAPI" width="50%" height="100%" />
        </Row>
        <br />
        <Row>
          <NPMCard title="NPM Commands" width="50%" height="100%" />
          <TicketSystemCard title="Dev Tickets" width="50%" height="100%" />
        </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
