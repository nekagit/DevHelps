import { default as ArtistObjectSimplified } from "spotify-web-api-node";
import { default as TrackObjectSimplified } from "spotify-web-api-node";
export interface IUseSpotifyService {
  logCurrentlyPlayedTrack: () => Promise<void>;
  nextSong: () => void;
  currentSong?: IUseSpotifyCurrentSong;
  playSongByName: (name: string) => Promise<void>;
  playAlbumById: (id: string) => Promise<void>;
  loginSpotDoc: () => void;
  handleRefreshToken: () => void;
  leftSide: string[];
  rightSide: string[];
  leftSideAlbum?: string[];
  rightSideAlbum?: string[];
  accessToken?: string;
  searchArtists: (query: string) => void;
  searchAlbums: (query: string) => void;
  searchPlaylists: (query: string) => void;
  searchTracks: (query: string) => void;
  getArtist: (query: string) => void;
  getAlbum: (query: string) => void;
  createPlaylist: (name: string) => void;
  addTracksToPlaylist: (formValue: string) => void;
}

export interface IUseSpotifyCurrentSong {
  name?: string;
  id?: string;
  artists?: string;
  albumId?: string;
  albumName?: string;
  albumType?: string;
  releaseDate?: string;
  artist?: ArtistObjectSimplified;
}

export interface IUseSpotifyCurrentAlbum {
  name?: string;
  id?: string;
  tracks?: TrackObjectSimplified[];
}

export interface IUseSpotifyCurrentPlaylist {
  name?: string;
  id?: string;

}

export interface IUseSpotifyCurrentArtist {
  name?: string;
  id: string;
}
