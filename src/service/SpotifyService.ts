import React, { useEffect, useMemo } from "react";
import {
  default as ArtistObjectSimplified,
  default as SpotifyWebApi,
} from "spotify-web-api-node";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import {
  IUseSpotifyCurrentSong,
  IUseSpotifyService,
} from "../interfaces/IUseSpotifyService";
import spotifyCredentials from "../assets/SpotifyCredentials.json";

const { clientId, redirectUri, clientSecret,scope } = spotifyCredentials;
const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;
function useSpotifyService(): IUseSpotifyService {

const windowsUrlTokenizer = () => {
  const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
  if (windowsUrlToken) {
    const token = windowsUrlToken[1];
    console.warn("token with url", token);
    if (token != "") localStorage.setItem("access_token", token);
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
     localStorage.setItem("access_token", "");
      console.log("no access token")
  }
};

 useEffect(() => {
  const currentToken = localStorage.getItem("access_token") ?? ""
  console.log(currentToken)
  if(currentToken != "") {
    console.log("status quo, accessToken")
  } else {
    windowsUrlTokenizer();
    const storageAccessToken = localStorage.getItem("access_token") ?? "";
    console.log("windowUrltokenizeser", storageAccessToken)
  }
}, []);

const accessToken = useMemo(() => {
  return localStorage.getItem("access_token") != null ? localStorage.getItem("access_token") : ""
}, [])

const goOutAccessToken = accessToken != null ? accessToken : ""
const spotifyApi: SpotifyWebApi = useMemo(() => {
  return new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
    accessToken: goOutAccessToken 
  });
}, []);

  const [currentSong, setCurrentSong] = React.useState<IUseSpotifyCurrentSong>();
  
  const { leftSide, rightSide } = useMemo(() => {
    const { result,  resultArray } = SpotifyHelpers().formatSongData(currentSong ?? {} as IUseSpotifyCurrentSong);
   if( result && resultArray) {
     console.log("current song ", result,resultArray )
     return {
       result,
       leftSide: resultArray
       .slice(0, resultArray.length / 2)
       .map((x) => x + "\n"),
       rightSide: resultArray
       .slice(resultArray.length / 2, resultArray.length - 1)
       .map((x) => x + "\n"),
      };
    } else return {result: "", leftSide: [""], rightSide: [""]}
    }, [currentSong]);

  const logCurrentlyPlayedTrack = async () => {
    console.log("logCurrentSong")
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
              const song = {
              name: track.name,
              artists: artists,
              albumId: track.album.id,
              albumName: track.album.name,
              albumType: track.album.type,
              releaseDate: track.album.release_date,
              artist: track.artists as unknown as ArtistObjectSimplified,
            };
            setCurrentSong(song);
          }
        } else {
          console.log("No track is currently playing.");
        }
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });
    };
    
      const handleRefreshToken = () => {
        localStorage.removeItem("access_token");
        spotifyApi.setAccessToken("");
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
    
    return {
      windowsUrlTokenizer,
      nextSong,
      logCurrentlyPlayedTrack,
      playSongByName,
      playAlbumById,
      currentSong,
      loginSpotDoc,
      handleRefreshToken,
      leftSide,
      rightSide,
      accessToken: goOutAccessToken 
  };
}

export { useSpotifyService };
