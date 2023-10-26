import {
  IUseSpotifyService,
} from "../interfaces/IUseSpotifyService";
import SpotifyLoginService from "./SpotifyLoginService";
import SpotifyTrackService from "./SpotifyTrackService";

function useSpotifyService(): IUseSpotifyService {
  const spotifyLoginService = SpotifyLoginService()
  const { spotifyApi, goOutAccessToken, handleRefreshToken, loginSpotDoc } = spotifyLoginService
  const spotifyTrackService = SpotifyTrackService(spotifyApi)
const {leftSide, leftSideAlbum,rightSide,rightSideAlbum,setCurrentAlbumTracks, currentAlbumTracks, currentSong, logCurrentlyPlayedAlbumTracks, logCurrentlyPlayedTrack } = spotifyTrackService
    const nextSong = () => {
      spotifyApi.skipToNext();
    };    

    const addTracksToPlaylist = async (formValue: string) => {
      const playlists = await spotifyApi.getUserPlaylists((await spotifyApi.getMe()).body.id).then((data)=>{return data.body.items})
      const playlist = playlists.find((data) =>
        {return data.name.toLocaleLowerCase() == formValue.toLocaleLowerCase()});
        const playlistId = playlist?.id
        if(currentSong) {
          console.log(currentSong)
          const tracks = currentSong.trackUri ??  ""
          console.log(tracks, playlistId)
          spotifyApi.addTracksToPlaylist(playlistId ?? "", [tracks])
          .catch((error) => {
            console.error("Error playing next song:", error);
          });;
        }
    };

    const createPlaylist = (name: string) => {
      spotifyApi.createPlaylist(name)
    }
        
    const getAlbum = (albumId: string) => {
      spotifyApi.getAlbum(albumId).then((data) => {
        const body = data.body.tracks.items.map(x => x.name)
        console.log(body)
        setCurrentAlbumTracks(body)
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
        await logCurrentlyPlayedTrack()
        await logCurrentlyPlayedAlbumTracks()
      };
    
      const playCurrentAlbum = async () => {
        console.log("asdf")
        await spotifyApi.play({
          context_uri: `spotify:album:${currentSong?.albumId}`,
        });
      };
     
      const previousSong = async () => {
        await spotifyApi.skipToPrevious()
      }
    return {
      nextSong,
      logCurrentlyPlayedTrack,
      playSongByName,
      playCurrentAlbum,
      currentSong,
      loginSpotDoc,
      handleRefreshToken,
      getAlbum,
      createPlaylist,
      addTracksToPlaylist,
      accessToken: goOutAccessToken,
      previousSong,
      logCurrentlyPlayedAlbumTracks,
leftSide,
leftSideAlbum,
rightSide,
rightSideAlbum,      
      currentAlbumTracks
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