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
    console.log(resultObject);
    return resultObject;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCardsDataFromJson = (json: any) => {
    const stringJson = JSON.stringify(json);
    console.log(stringJson);
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
    getCardsDataFromJson,
    executeAction,
  };
}
