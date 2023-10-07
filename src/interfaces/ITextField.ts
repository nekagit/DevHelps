import { IBaseEntity } from "./IBaseEntity";
import { IEventButton } from "./IEventButton";
export interface ITextField extends IBaseEntity {
  placeholder: string;
  button: IEventButton;
}
