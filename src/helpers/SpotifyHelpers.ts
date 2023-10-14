import { IUseSpotifyCurrentSong } from "../interfaces/IUseSpotifyService";

export const SpotifyHelpers = () => {
  const formatSongData = (songJson: IUseSpotifyCurrentSong) => {
  console.log("render")
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
  return { formatSongData };
};
