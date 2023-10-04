// Define the interface for the SpotifyService
export interface IUseSpotifyService {
  logCurrentlyPlayedTrack: () => Promise<void>;
  accessToken: string | null;
  nextSong: () => void;
  currentSong: IUseSpotifyCurrentSong;
  playSongByName: (name: string) => Promise<void>;
  playAlbumById: (id: string) => Promise<void>;
  loginSpotDoc: () => void;
}

export interface IUseSpotifyCurrentSong {
  name: string;
  artists: string;
  albumId: string;
}
