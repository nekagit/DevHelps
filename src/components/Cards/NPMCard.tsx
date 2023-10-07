import { Button, Card, Flex, rem, Select, Text } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import paths from "../../assets/paths.json";

interface IProps {
  title: string;
  path: string;
  height?: string;
  color?: string;
  border?: string;
}

function NPMCard(props: IProps) {
  const { title, color } = props;
  const borderStyle = "1px solid black";
  const allPaths = Object.values(paths);
  const [path, setPath] = useState("");

  const handleNPMAction = async (scriptName: string) => {
    try {
      const response = await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: [""],
          path: path,
        }), // Include branchName in the request body
      });

      if (response.ok) {
        console.log(`Git script "${scriptName}" executed successfully.`);
      } else {
        console.error("Error executing Git script.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
  };
  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          backgroundColor: color,
          border: borderStyle,
          margin: "21px",
        }}
      >
        <Card.Section bg="rgba(0, 0, 333, .1)" style={{ padding: "21px" }}>
          <hr />
          <Select
            key={"path"}
            label="path"
            placeholder="Pick value"
            value={path}
            onChange={(e: string | null) => handleSelect(e)}
            data={allPaths}
          />
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <Text fw={500}> {title} </Text>
          </Flex>
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button onClick={() => handleNPMAction("npm-run-start.bat")}>
              <IconPlayerPlay
                style={{ width: rem(21), height: rem(21) }}
                stroke={1.5}
                color="var(--mantine-color-red-filled)"
              />
            </Button>
            <Button onClick={() => handleNPMAction("npm-run-tests.bat")}>
              tests
            </Button>
            <Button onClick={() => handleNPMAction("npm-run-test.bat")}>
              test
            </Button>
            <Button onClick={() => handleNPMAction("npm-install.bat")}>
              install
            </Button>
            <Button onClick={() => handleNPMAction("npm-run-tsc.bat")}>
              TSC
            </Button>
          </Flex>
        </Card.Section>
      </Card>
    </>
  );
}

export default NPMCard;
