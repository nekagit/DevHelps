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
  
  const getFormValue = (fieldName: string, formValues: any): string => {
    console.log(formValues, fieldName)
    const formFieldIndex = Object.keys(formValues).findIndex(
      (x) => x == fieldName
    );
    return Object.values(formValues)[formFieldIndex] as string;
  };

  return {
    getInitialObject,
    getFormValue,
  };
}
