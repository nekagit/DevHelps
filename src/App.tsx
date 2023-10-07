import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import appTs from "./AppTS";
import FormCard from "./components/FormCard";
function App() {
  const { gitCard } = appTs();
  const [sizes, setSizes] = useState([133, 133, "auto"]);

  // <Pane
  //       minSize={50}
  //       maxSize="50%"
  //       style={{ overflow: "auto" }}
  //       className="scrollbar-hidden-container"
  //     >
  //       <SpotifyCard title="SpotifyWebAPI" path={form.values.path} />
  //     </Pane>

  //     <Pane
  //       minSize={50}
  //       maxSize="50%"
  //       style={{ overflow: "auto" }}
  //       className="scrollbar-hidden-container"
  //     >
  //       <NPMCard title="NPM Commands" path={form.values.path} />

  //       <TicketSystemCard title="Dev Tickets" path={form.values.path} />
  //     </Pane>

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
              form={gitCard.githubFormCard.form}
            />
          </Pane>
          <div></div>
        </SplitPane>
      </div>
      ;
    </>
  );
}

export default App;
