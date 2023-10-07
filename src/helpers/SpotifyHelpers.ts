import SpotifyWebApi from "spotify-web-api-node";

export const SpotifyHelpers = (spotifyApi: SpotifyWebApi) => {
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("access_token");

      if (!refreshToken) {
        console.error("Refresh token not found in localStorage");
        return;
      }
      const newAccessToken = await spotifyApi.getRefreshToken();
      spotifyApi.setAccessToken(newAccessToken ?? "");

      localStorage.setItem("access_token", newAccessToken ?? "");
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    fetch(`/refresh_token?refresh_token=${refreshToken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .catch((error) => {
        console.error("Error refreshing token:", error);
      });
  };

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
  return { refreshToken, refreshAccessToken, windowsUrlTokenizer };
};
