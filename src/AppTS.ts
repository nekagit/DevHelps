import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";

function AppTs() {
  const gitCard = GitHubCard();
  return {
    SpotifyCard,
    TicketSystemCard,
    gitCard,
    NPMCard,
  };
}
export default AppTs;
