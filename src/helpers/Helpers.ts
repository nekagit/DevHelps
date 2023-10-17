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
  

  return {
    getInitialObject,
  };
}
