import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";
import { Paper } from "@mantine/core";

function App() {
  const { GitHubCard, SpotifyCard, NPMCard, TicketSystemCard } = appTs();
  const [sizes, setSizes] = useState(["auto", 300, 300,100]);
  const customSashRenderer = () => {
    return <div className="custom-sash" />;
  };

  return (
    <>
      <div style={{ height: 1000,padding:"21px", backgroundColor: "whitesmoke" }}>
        <SplitPane
          split="horizontal"
          sizes={sizes}
          onChange={(newSizes) => {
            setSizes(newSizes);
          }}
          sashRender={customSashRenderer}
        >
          <Paper shadow="xl">
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto", height: 333 }}
            className="scrollbar-hidden-container"
            >
            <GitHubCard />
          </Pane>
            </Paper>
          <Paper shadow="xl">
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto", height: 333 }}
            className="scrollbar-hidden-container"
            >
            <SpotifyCard />
          </Pane>
            </Paper>
          <Paper shadow="xl">
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto", height: 333 }}
            className="scrollbar-hidden-container"
            >
            <NPMCard />
          </Pane>
            </Paper>
          <Paper shadow="xl">
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto", height: 333 }}
            className="scrollbar-hidden-container"
            >
            <TicketSystemCard />
            </Pane>
              </Paper>
        </SplitPane>
      </div>
      ;
    </>
  );
}

export default App;
