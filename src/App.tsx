import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";

function App() {
  const { GitHubCard, SpotifyCard, NPMCard, TicketSystemCard } = appTs();
  const [sizes, setSizes] = useState([1000, 1000, 500]);
  const customSashRenderer = () => {
    return <div className="custom-sash" />;
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
