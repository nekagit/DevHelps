import React, { useEffect } from "react";
import {
  default as ArtistObjectSimplified,
  default as SpotifyWebApi,
} from "spotify-web-api-node";
import spotifyCredentials from "../assets/SpotifyCredentials.json";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import {
  IUseSpotifyCurrentSong,
  IUseSpotifyService,
} from "../interfaces/IUseSpotifyService";

function useSpotifyService(): IUseSpotifyService {
  const { clientId, clientSecret, redirectUri, scope } = spotifyCredentials;
  const [accessToken, setAccessToken] = React.useState("");
  const [currentSong, setCurrentSong] = React.useState<IUseSpotifyCurrentSong>({
    name: "",
    artists: "",
    albumId: "",
    albumName: "",
    albumType: "",
    releaseDate: "",
    artist: {} as unknown as ArtistObjectSimplified,
  });
  const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

  const spotifyApi: SpotifyWebApi = React.useMemo(() => {
    return new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri,
      accessToken: accessToken ?? "",
    });
  }, [accessToken, clientId, clientSecret, redirectUri]);

  useEffect(() => {
    const storageAccessToken = localStorage.getItem("access_token");
    if (storageAccessToken == undefined) {
      const spotifyAccessToken = spotifyApi.getAccessToken();
      if (spotifyAccessToken == undefined) {
        SpotifyHelpers(spotifyApi).windowsUrlTokenizer();
      } else {
        setAccessToken(spotifyAccessToken);
      }
    } else {
      setAccessToken(storageAccessToken);
    }
  }, [spotifyApi, accessToken]);

  const handleRefreshToken = () => {
    console.log("handleREfresh");
    localStorage.removeItem("access_token");
    const refreshToken = spotifyApi.getRefreshToken();
    console.log(refreshToken);
  };

  const loginSpotDoc = () => {
    window.location.href = spotifyLoginUrl;
  };

  const nextSong = () => {
    spotifyApi.skipToNext();
  };

  const playSongByName = async (name: string) => {
    const searchResults = await spotifyApi.searchTracks(name, {
      limit: 1,
    });
    if (
      searchResults.body.tracks &&
      searchResults.body.tracks.items.length > 0
    ) {
      const firstResult = searchResults.body.tracks.items[0];
      const trackUri = firstResult.uri;
      await spotifyApi.play({
        uris: [trackUri],
      });
      console.log(`Now playing: ${firstResult.name}`);
    } else {
      console.log("No matching songs found.");
    }
  };

  const playAlbumById = async (id: string) => {
    await spotifyApi.play({
      context_uri: `spotify:album:${id}`,
    });
  };

  const logCurrentlyPlayedTrack = async () => {
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data) => {
        if (data.body.is_playing) {
          const track: SpotifyApi.TrackObjectFull = data.body
            .item as SpotifyApi.TrackObjectFull;
          if (track) {
            const artists = track.artists
              .map((artist) => artist.name)
              .join(", ");
            setCurrentSong({
              name: track.name,
              artists: artists,
              albumId: track.album.id,
              albumName: track.album.name,
              albumType: track.album.type,
              releaseDate: track.album.release_date,
              artist: track.artists as unknown as ArtistObjectSimplified,
            });
          }
        } else {
          console.log("No track is currently playing.");
        }
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });
  };

  return {
    logCurrentlyPlayedTrack,
    accessToken,
    nextSong,
    playSongByName,
    playAlbumById,
    currentSong,
    loginSpotDoc,
    handleRefreshToken,
  };
}

export { useSpotifyService };
