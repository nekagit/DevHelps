import GitHubCard from "./components/Cards/GitHubCard";
import NPMCard from "./components/Cards/NPMCard";
import SpotifyCard from "./components/Cards/SpotifyCard";
import TicketSystemCard from "./components/Cards/TicketSystemCard";

function AppTs() {
  const gitCard = GitHubCard();
  return {
    gitCard,
    SpotifyCard,
    NPMCard,
    TicketSystemCard,
  };
}
export default AppTs;
