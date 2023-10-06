import { Card, MantineProvider, Select } from "@mantine/core";
import "@mantine/core/styles.css";
import { useForm } from "@mantine/form";
import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./App.css";
import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";
const myPaths = {
  home: " C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps",
  work: " C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelpser",
};
function App() {
  const [sizes, setSizes] = useState(["33%", "33%", "auto"]);
  const [value, setValue] = useState("");
  const form = useForm({
    initialValues: {
      path: myPaths.home,
    },
  });
  const handleSelect = (e: string | null) => {
    setValue(e ?? "");
  };
  return (
    <>
      <MantineProvider>
        <Card>
          <Select
            label="path"
            placeholder="Pick value"
            value={value}
            onChange={(e: string | null) => handleSelect(e)}
            data={Object.values(myPaths)}
          />
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
                <GitHubCard title="Git Commands" path={form.values.path} />
              </Pane>
              <Pane
                minSize={50}
                maxSize="50%"
                style={{ overflow: "auto" }}
                className="scrollbar-hidden-container"
              >
                <SpotifyCard title="SpotifyWebAPI" path={form.values.path} />
              </Pane>

              <Pane
                minSize={50}
                maxSize="50%"
                style={{ overflow: "auto" }}
                className="scrollbar-hidden-container"
              >
                <NPMCard title="NPM Commands" path={form.values.path} />

                <TicketSystemCard title="Dev Tickets" path={form.values.path} />
              </Pane>
            </SplitPane>
          </div>
        </Card>
      </MantineProvider>
      ;
    </>
  );
}

export default App;
