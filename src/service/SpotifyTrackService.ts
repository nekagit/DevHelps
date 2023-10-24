import { useMemo, useState } from "react";
import { SpotifyHelpers } from "../helpers/SpotifyHelpers";
import { IUseSpotifyCurrentSong } from "../interfaces/IUseSpotifyService";
import { useSpotifyService } from "./SpotifyService";
import SpotifyWebApi from "spotify-web-api-node";

export default function SpotifyTrackService(spotifyApi: SpotifyWebApi) {
  const [currentSong, setCurrentSong] = useState<IUseSpotifyCurrentSong>();
  const [currentAlbumTracks, setCurrentAlbumTracks] = useState<any>()
  console.log( currentAlbumTracks, "trakcs")
  
  
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
        
  
      const logCurrentlyPlayedAlbumTracks = async () => {
        spotifyApi
        .getAlbumTracks(currentSong?.albumId ?? "")
        .then((data) => {
          const tracks: SpotifyApi.TrackObjectFull[] = data.body
            .items as SpotifyApi.TrackObjectFull[];
              setCurrentAlbumTracks(tracks.map(x => x.name));
           
          })
          .catch((error) => {
            console.error("Error playing next song:", error);
          });
        };
          
  
const { leftSide, rightSide } = useMemo(() => {
    const { result,  resultArray } = SpotifyHelpers().formatSongData(currentSong ?? {} as IUseSpotifyCurrentSong);
   if( result && resultArray) {
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
      if(currentAlbumTracks) {
        return {
          leftSideAlbum: currentAlbumTracks
          .slice(0, currentAlbumTracks.length / 2)
          .map((x: string) => x + "\n"),
          rightSideAlbum: currentAlbumTracks
          .slice(currentAlbumTracks.length / 2, currentAlbumTracks.length - 1)
          .map((x: string) => x + "\n"),
        };
      }else {
        return {leftSideAlbum: [""], rightSideAlbum: [""]}
      }
      }, [currentAlbumTracks]);
      return {
            rightSide,
            leftSide,
            leftSideAlbum, 
            rightSideAlbum,
            currentAlbumTracks,
            currentSong,
            logCurrentlyPlayedAlbumTracks,
            logCurrentlyPlayedTrack,
            setCurrentAlbumTracks
        }
}