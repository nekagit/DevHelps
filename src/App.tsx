import { Card, Grid, MantineProvider, Select } from "@mantine/core";
import "@mantine/core/styles.css";
import { useForm } from "@mantine/form";
import { useState } from "react";
import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";

const myPaths = {
  home: " C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps",
  work: " Mulance",
};
function App() {
  const form = useForm({
    initialValues: {
      path: myPaths.home,
    },
  });
  const [value, setValue] = useState("");
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
          <Grid>
            <Grid.Col span={6}>
              <GitHubCard title="Git Commands" path={form.values.path} />
            </Grid.Col>
            <Grid.Col span={6}>
              <SpotifyCard title="SpotifyWebAPI" path={form.values.path} />
            </Grid.Col>
            <Grid.Col span={6}>
              <NPMCard title="NPM Commands" path={form.values.path} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TicketSystemCard title="Dev Tickets" path={form.values.path} />
            </Grid.Col>
          </Grid>
        </Card>
      </MantineProvider>
      ;
    </>
  );
}

export default App;
