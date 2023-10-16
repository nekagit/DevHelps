import React, { useEffect, useMemo } from "react";
import {
  default as ArtistObjectSimplified,
  default as SpotifyWebApi,
} from "spotify-web-api-node";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import {
  IUseSpotifyCurrentAlbum,
  IUseSpotifyCurrentSong,
  IUseSpotifyCurrentPlaylist,
  IUseSpotifyCurrentArtist,
  IUseSpotifyService,
} from "../interfaces/IUseSpotifyService";
import spotifyCredentials from "../assets/SpotifyCredentials.json";

const { clientId, redirectUri, clientSecret,scope } = spotifyCredentials;
const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

function useSpotifyService(): IUseSpotifyService {

  const [currentSong, setCurrentSong] = React.useState<IUseSpotifyCurrentSong>();
const [currentAlbumTracks, setCurrentAlbumTracks] = React.useState<IUseSpotifyCurrentAlbum>()
const [currentPlaylist, setCurrentPlaylist] = React.useState<IUseSpotifyCurrentPlaylist>()
const [currentArtist, setCurrentArtist] = React.useState<IUseSpotifyCurrentArtist>()
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

useEffect(() => {
  const currentToken = localStorage.getItem("access_token") ?? ""
  if(currentToken != "") {
    console.log("status quo, accessToken")
  } else {
    SpotifyHelpers().windowsUrlTokenizer();
    const storageAccessToken = localStorage.getItem("access_token") ?? "";
    console.log("windowUrltokenizeser", storageAccessToken)

  }
}, []);

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

  
  const { leftSideAlbum, rightSideAlbum } = useMemo(() => {
    console.log(currentAlbumTracks, "currentalbumtrakcs")
    const { result,  resultArray } = SpotifyHelpers().formatSongData(currentAlbumTracks ?? {} as IUseSpotifyCurrentAlbum);
   if( result && resultArray) {
     return {
       result,
       leftSideAlbum: resultArray
       .slice(0, resultArray.length / 2)
       .map((x) => x + "\n"),
       rightSideAlbum: resultArray
       .slice(resultArray.length / 2, resultArray.length - 1)
       .map((x) => x + "\n"),
      };
    } else return {result: "", leftSide: [""], rightSide: [""]}
    }, [currentSong]);

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
              const song = {
              name: track.name,
              id: track.id,
              trackUri: track.uri,
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
        window.location.reload()

      };
    
      const loginSpotDoc = () => {
        window.location.href = spotifyLoginUrl;
      };
      
    const nextSong = () => {
      spotifyApi.skipToNext();
    };    

    const addTracksToPlaylist = async (formValue: string) => {
      const playlists = await spotifyApi.getUserPlaylists((await spotifyApi.getMe()).body.id).then((data)=>{return data.body.items})
      const playlist = playlists.find((data) =>
        {return data.name.toLocaleLowerCase() == formValue.split(",")[0].toLocaleLowerCase()});
        const playlistId = playlist?.id
      const tracks = formValue.split(",")
      tracks.splice(0, 1)
      spotifyApi.addTracksToPlaylist(playlistId ?? "", tracks)
    .catch((error) => {
      console.error("Error playing next song:", error);
    });;
    };

    const createPlaylist = (name: string) => {
      spotifyApi.createPlaylist(name)
    }
        
    const getAlbum = (albumId: string) => {
      spotifyApi.getAlbum(albumId).then((data) => {
        const body = data.body
        const currentAlbum = {name: body.name, id: body.id, artists: body.artists, tracks: body.tracks.items}  as unknown as IUseSpotifyCurrentAlbum
        setCurrentAlbumTracks(currentAlbum)
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
    };
    
    const getArtist = (artistId: string) => {
      spotifyApi.getArtist(artistId).then((data) => {
        const body = data.body
        const currentArtist = {name: body.name, id: body.id, genres: body.genres }  as unknown as IUseSpotifyCurrentArtist
        setCurrentArtist(currentArtist)
        console.log(currentArtist, "data.body")
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
    };

    const searchArtists = (query: string) => {
      spotifyApi.searchArtists(query).then((data) => {
          
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
    };
    
    const searchAlbums = (query: string) => {
      spotifyApi.searchAlbums(query).then((data) => {
          
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
    };
    
    const searchTracks = (query: string) => {
      spotifyApi.searchTracks(query).then((data) => {
          
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
    };
    
    const searchPlaylists = (query: string) => {
      spotifyApi.searchPlaylists(query).then((data) => {
          
      })
      .catch((error) => {
        console.error("Error playing next song:", error);
      });;
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
      nextSong,
      logCurrentlyPlayedTrack,
      playSongByName,
      playAlbumById,
      currentSong,
      loginSpotDoc,
      handleRefreshToken,
      leftSide,
      rightSide,
      leftSideAlbum,
      rightSideAlbum,
      searchArtists,
      searchAlbums,
      searchPlaylists,
      searchTracks,
      getArtist,
      getAlbum,
      createPlaylist,
      addTracksToPlaylist,
      accessToken: goOutAccessToken
  };
}

export { useSpotifyService };
// {
//   "key": "getArtistByArtistId",
//   "label": "Get by Artist Id",
//   "name": "Show Details of ArtistId",
//   "placeholder": "Fill in ArtistId of Album to be displayed",
//   "button": {
//     "action": "getArtistByArtistId",
//     "key": "showButton",
//     "name": "getArtistByArtistId",
//     "label": "Show"
//   }
// },
// {
//   "key": "searchArtistByName",
//   "label": "Search Artist Id",
//   "name": "Show Details of ArtistId",
//   "placeholder": "Fill in ArtistId of Album to be displayed",
//   "button": {
//     "action": "searchArtistByName",
//     "key": "searchButton",
//     "name": "searchArtistByName",
//     "label": "Search"
//   }
// },
// {
//   "key": "searchAlbumByName",
//   "label": "Search Album Id",
//   "name": "Show Details of AlbumId",
//   "placeholder": "Fill in AlbumId of Album to be displayed",
//   "button": {
//     "action": "searchAlbumByName",
//     "key": "searchButton",
//     "name": "searchAlbumByName",
//     "label": "Search"
//   }
// },
// {
//   "key": "searchTracksByName",
//   "label": "Search Track Id",
//   "name": "Show Details of TrackId",
//   "placeholder": "Fill in TrackId of Track to be displayed",
//   "button": {
//     "action": "searchTracksByName",
//     "key": "searchButton",
//     "name": "searchTracksByName",
//     "label": "Search"
//   }
// },
// {
//   "key": "searchPlaylistByName",
//   "label": "Search Playlist Id",
//   "name": "Show Details of PlaylistId",
//   "placeholder": "Fill in PlaylistId of Playlist to be displayed",
//   "button": {
//     "action": "searchPlaylistByName",
//     "key": "searchButton",
//     "name": "searchPlaylistByName",
//     "label": "Search"
//   }
// }