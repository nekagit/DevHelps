import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IProps {
  title: string;
  path: string;
  height?: string;
  color?: string;
  border?: string;
}

function GitHubCard(props: IProps) {
  const { title, path, color, border } = props;
  const borderStyle = "1px solid black";
  const form = useForm({
    initialValues: {
      branchName: "",
      branchSync: "",
      commitMessage: "",
      checkoutBranch: "",
    },
  });

  function getScriptParameter(scriptName: string) {
    switch (scriptName) {
      case "create-branch.bat": {
        return form.values.branchName;
      }
      case "sync-develop.bat": {
        return form.values.branchSync;
      }
      case "commit-Implemented.bat": {
        return "";
      }
      case "commit.bat": {
        return form.values.commitMessage;
      }
      case "checkoutBranch.bat": {
        return form.values.checkoutBranch;
      }
    }
  }

  const handleGitAction = async (scriptName: string) => {
    try {
      const scriptParameters = getScriptParameter(scriptName);
      console.log(scriptParameters);
      const response = await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: scriptParameters,
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
  return (
    <>
      <Card
        shadow="sm"
        withBorder
        style={{
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Section bg="rgba(0, 222, 0, .1)">
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <Text fw={500}> {title} </Text>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="branchName"
              {...form.getInputProps("branchName")}
              placeholder="Branch Name"
            />
            <Button onClick={() => handleGitAction("create-branch.bat")}>
              Create
            </Button>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="branchSync"
              {...form.getInputProps("branchSync")}
              placeholder="Branch Names to sync with"
            />
            <Button onClick={() => handleGitAction("sync-develop.bat")}>
              Sync All
            </Button>
          </Flex>
          <hr />
          <Flex justify="center" align="center" direction="row" wrap="wrap">
            <Button onClick={() => handleGitAction("commit-Implemented.bat")}>
              Commit Current with Comment "Update"
            </Button>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="commitMessage"
              {...form.getInputProps("commitMessage")}
              placeholder="Commitmessage"
            />
            <Button onClick={() => handleGitAction("commit.bat")}>
              Commit with Message
            </Button>
          </Flex>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              width={"100%"}
              label="checkoutBranch"
              {...form.getInputProps("checkoutBranch")}
              placeholder="Checkout Branch"
            />
            <Button onClick={() => handleGitAction("checkoutBranch.bat")}>
              Checkout
            </Button>
          </Flex>
          <br />
        </Card.Section>
      </Card>
    </>
  );
}

export default GitHubCard;
