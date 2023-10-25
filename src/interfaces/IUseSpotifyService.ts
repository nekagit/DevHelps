import SpotifyWebApi, { default as ArtistObjectSimplified } from "spotify-web-api-node";
import { default as TrackObjectSimplified } from "spotify-web-api-node";
export interface IUseSpotifyService {
  logCurrentlyPlayedTrack: () => Promise<void>;
  nextSong: () => void;
  currentSong?: IUseSpotifyCurrentSong;
  currentAlbumTracks?: TrackObjectSimplified[];
  playSongByName: (name: string) => Promise<void>;
  playCurrentAlbum: () => Promise<void>;
  loginSpotDoc: () => void;
  handleRefreshToken: () => void;
  leftSideAlbum?: string[];
  rightSideAlbum?: string[];
  leftSide?: string[];
  rightSide?: string[];
  accessToken?: string;
  getAlbum: (query: string) => void;
  createPlaylist: (name: string) => void;
  addTracksToPlaylist: (formValue: string) => void;
  previousSong: () => void
  logCurrentlyPlayedAlbumTracks: () => void
}

export interface IUseSpotifyCurrentSong {
  name?: string;
  id?: string;
  artists?: string;
  albumId?: string;
  albumName?: string;
  albumType?: string;
  uri?: string;
  trackUri?: string;
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
