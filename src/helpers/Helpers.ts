import GitHubCard from "../components/Cards/GitHubCard";
import { IBaseEntity } from "./../interfaces/IBaseEntity";
export function Helpers() {
  const getInitialObject = <T extends IBaseEntity>(objectArray: T[] | null) => {
    const textFieldKeys = Array.isArray(objectArray)
      ? objectArray.map((field: IBaseEntity) => field.key)
      : [];
    const defaultValues: Partial<{ [key: string]: string }> = {};
    textFieldKeys.forEach((field) => {
      defaultValues[field] = "";
    });

    return defaultValues;
  };
  const executeAction = (
    action: string,
    scriptName: string,
    currentValue: string,
    path: string
  ) => {
    if (action === "handleGitAction") {
      GitHubCard().handleGitAction(scriptName, currentValue, path);
    }
    if (action === "handleNPMAction") {
      // NPMCard({ path }).handleNPMAction(scriptName);
    }
  };

  return {
    getInitialObject,
    executeAction,
  };
}
