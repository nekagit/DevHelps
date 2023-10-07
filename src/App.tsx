import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";
import FormCard from "./components/Cards/FormCard";
import TicketSystemCard from "./components/Cards/TicketSystemCard";
function App() {
  const { gitCard, SpotifyCard } = appTs();
  const [sizes, setSizes] = useState([1000, 1000, 500]);
  const customSashRenderer = () => {
    return (
      <div
        className="custom-sash"
        style={{
          background: "#333",
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
            <FormCard
              key={gitCard.githubFormCard.title}
              title={gitCard.githubFormCard.title}
              color={gitCard.githubFormCard.color}
              borderStyle={gitCard.githubFormCard.borderStyle}
              textFields={gitCard.githubFormCard.textFields}
              eventButtons={gitCard.githubFormCard.eventButtons}
            />
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
            {/* <NPMCard title="NPM Commands" path={form.values.path} /> */}

            <TicketSystemCard title="Dev Tickets" />
          </Pane>
        </SplitPane>
      </div>
      ;
    </>
  );
}

export default App;
