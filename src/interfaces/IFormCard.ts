import SpotifyWebApi from "spotify-web-api-node";
import { IBadge } from "./IBadge";
import { IEventButton } from "./IEventButton";
import { ITextField } from "./ITextField";

export interface IFormCard {
  title?: string;
  pathNeeded?: boolean;
  path?: string;
  borderStyle: string;
  color?: string;
  textFields?: ITextField[];
  eventButtons?: IEventButton[];
  badges?: IBadge[];
  songDataDisplay: boolean;
  apis?: SpotifyWebApi[]
}
