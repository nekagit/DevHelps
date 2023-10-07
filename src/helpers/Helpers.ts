import { IUseSpotifyCurrentSong } from "../interfaces/IUseSpotifyService";
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

  const formatSongData = (songJson: IUseSpotifyCurrentSong) => {
    const songKeys = Object.keys(songJson);
    const songValue = Object.values(songJson);
    const songs = songKeys.map((x, i) => ({ [x]: songValue[i] }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resultArray = Object.entries(songs).map(([keys, values]) => {
      if (typeof Object.values(values)[0] === "object") {
        return `${Object.keys(values)[0]}: {};`;
      }

      return `${Object.keys(values)[0]}: ${Object.values(values)[0]}`;
    });
    return { result: resultArray.join("\n"), resultArray };
  };

  return {
    getInitialObject,
    formatSongData,
  };
}
