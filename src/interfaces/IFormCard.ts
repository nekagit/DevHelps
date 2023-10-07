import { IBadge } from "./IBadge";
import { IEventButton } from "./IEventButton";
import { ITextField } from "./ITextField";

export interface IFormCard {
  title?: string;
  path?: string;
  borderStyle: string;
  color?: string;
  textFields?: ITextField[];
  eventButtons?: IEventButton[];
  badges?: IBadge[];
}
