import SpotifyWebApi from "spotify-web-api-node";

export const SpotifyHelpers = (spotifyApi: SpotifyWebApi) => {
  const windowsUrlTokenizer = () => {
    const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
    console.log(windowsUrlToken);
    if (windowsUrlToken) {
      const token = windowsUrlToken[1];
      spotifyApi.setAccessToken(token);
      console.warn("token set", spotifyApi.getAccessToken());
      localStorage.setItem("access_token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.warn("token set", spotifyApi.getAccessToken());
    }
  };
  return { windowsUrlTokenizer };
};
