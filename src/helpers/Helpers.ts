import GitHubCard from "../components/GitHubCard";
import { IBaseEntity } from "./../interfaces/IBaseEntity";
export function Helpers<T>() {
  const getInitialObject = (objectArray: T | null) => {
    const textFieldKeys = Array.isArray(objectArray)
      ? objectArray.map((field: IBaseEntity) => field.key)
      : [];
    const initialObject: { [key: string]: string } = {};
    const resultObject = textFieldKeys.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, initialObject);
    return resultObject;
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
