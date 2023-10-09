import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";
import NPMCard from "./components/Cards/NPMCard";
import TicketSystemCard from "./components/Cards/TicketSystemCard";

function App() {
  const { GitHubCard, SpotifyCard } = appTs();
  const [sizes, setSizes] = useState([1000, 1000, 500]);
  const customSashRenderer = () => {
    return (
      <div
        className="custom-sash"
        style={{
          background: "black",
          width: "4px",
          cursor: "col-resize",
        }}
      />
    );
  };

  return (
    <>
      <div style={{ height: 1000 }}>
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={(newSizes) => {
            setSizes(newSizes);
          }}
          sashRender={customSashRenderer}
        >
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto" }}
            className="scrollbar-hidden-container"
          >
            <GitHubCard />
          </Pane>
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto" }}
            className="scrollbar-hidden-container"
          >
            <SpotifyCard />
          </Pane>
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto" }}
            className="scrollbar-hidden-container"
          >
            <NPMCard />
            <TicketSystemCard title="Dev Tickets" />
          </Pane>
        </SplitPane>
      </div>
      ;
    </>
  );
}

export default App;
