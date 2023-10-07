import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";
import FormCard from "./components/Cards/FormCard";
import TicketSystemCard from "./components/Cards/TicketSystemCard";
function App() {
  const { gitCard, SpotifyCard } = appTs();
  const [sizes, setSizes] = useState([333, 333, "auto"]);

  return (
    <>
      <hr />
      <div style={{ height: 1000 }}>
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          // @ts-expect-error - kp bis jetzt
          sashRender={() => {}}
        >
          <Pane
            minSize={50}
            maxSize="50%"
            style={{ overflow: "auto" }}
            className="scrollbar-hidden-container"
          >
            <FormCard
              title={gitCard.githubFormCard.title}
              color={gitCard.githubFormCard.color}
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
            <SpotifyCard title="SpotifyWebAPI" />
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
          <div></div>
        </SplitPane>
      </div>
      ;
    </>
  );
}

export default App;
