import { IEventButton } from "./IEventButton";
import { ITextField } from "./ITextField";

export interface IFormCard {
  title?: string;
  path?: string;
  color?: string;
  textFields?: ITextField[];
  eventButtons?: IEventButton[];
}
