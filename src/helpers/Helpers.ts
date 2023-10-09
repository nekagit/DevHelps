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

  const executeScriptRequest = async (
    scriptName: string,
    scriptParameter: string,
    path: string
  ) => {
    try {
      await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: scriptParameter,
          path: path,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return {
    getInitialObject,
    executeScriptRequest,
  };
}
