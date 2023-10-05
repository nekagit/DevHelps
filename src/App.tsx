import { Card, Grid, MantineProvider, TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { useForm } from "@mantine/form";
import GitHubCard from "./components/GitHubCard";
import NPMCard from "./components/NPMCard";
import SpotifyCard from "./components/SpotifyCard";
import TicketSystemCard from "./components/TicketSystemCard";

function App() {
  const form = useForm({
    initialValues: {
      path: "",
    },
  });
  return (
    <>
      <MantineProvider>
        <Card>
          <Grid>
            <TextInput
              label="path"
              placeholder="Path"
              {...form.getInputProps("path")}
            />
            C:\Users\Nenad\Desktop\DevsHelp\DevHelps
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
