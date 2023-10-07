import { UseFormReturnType } from "@mantine/form";
import { IEventButton } from "./IEventButton";
import { ITextField } from "./ITextField";

export interface IFormCard {
  title?: string;
  path?: string;
  color?: string;
  textFields?: ITextField[];
  eventButtons?: IEventButton[];
  form: UseFormReturnType<
    Record<string, unknown>,
    (values: Record<string, unknown>) => Record<string, unknown>
  >;
}
