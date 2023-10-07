import CardsJson from "../../assets/CardsJson.json";
import { IEventButton } from "../../interfaces/IEventButton";
import { ITextField } from "../../interfaces/ITextField";

function GitHubCard() {
  const gitHubCard = CardsJson.AllCards[0];

  const githubFormCard = {
    title: gitHubCard.name,
    color: gitHubCard.data.color,
    borderStyle: gitHubCard.data.borderStyle,
    textFields: gitHubCard.data.textFields as ITextField[],
    eventButtons: gitHubCard.data.eventButtons as IEventButton[],
    pathNeeded: gitHubCard.data.pathNeeded,
  };

  const handleGitAction = async (
    scriptName: string,
    fieldValue: string,
    path: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: fieldValue,
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
