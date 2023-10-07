import { useForm } from "@mantine/form";
import CardsJson from "../assets/CardsJson.json";
import { Helpers } from "../helpers/Helpers";
import { IEventButton } from "./../interfaces/IEventButton";
import { ITextField } from "./../interfaces/ITextField";

function GitHubCard() {
  const gitHubCard = CardsJson.AllCards[0];
  const formData = Helpers().getInitialObject(gitHubCard.data.textFields);
  const form = useForm({
    initialValues: {
      path: "",
      ...formData,
    },
  });
  console.log(form.values.path);
  const githubFormCard = {
    title: gitHubCard.name,
    color: gitHubCard.data.color,
    borderStyle: gitHubCard.data.borderStyle,
    textFields: gitHubCard.data.textFields as ITextField[],
    form: form,
    eventButtons: gitHubCard.data.eventButtons as IEventButton[],
  };

  const handleGitAction = async (
    scriptName: string,
    fieldName: string,
    path: string
  ) => {
    try {
      const formFieldIndex = Object.keys(form.values).findIndex(
        (x) => x == fieldName
      );
      const scriptParameters = Object.values(form.values)[formFieldIndex];
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
        }),
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
  return { githubFormCard, handleGitAction };
}

export default GitHubCard;
