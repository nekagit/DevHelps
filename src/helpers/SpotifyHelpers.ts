import SpotifyWebApi from "spotify-web-api-node";

export const SpotifyHelpers = (spotifyApi: SpotifyWebApi) => {
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("access_token");
      console.log(refreshToken);

      if (!refreshToken) {
        console.error("Refresh token not found in localStorage");
        return;
      }
      const refershTokenSpot = spotifyApi.refreshAccessToken;
      console.log(refershTokenSpot);
      const newAccessToken = await spotifyApi.getRefreshToken();
      console.log("token refreshed", newAccessToken);
      spotifyApi.setAccessToken(newAccessToken ?? "");

      localStorage.setItem("access_token", newAccessToken ?? "");
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // Example code to refresh the token from your React component
  const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    fetch(`/refresh_token?refresh_token=${refreshToken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data);
        const newAccessToken = data.access_token; // Assuming the response contains an "access_token" field
        console.log(newAccessToken);
        // Update the access token in your React state or wherever you store it
        // You may also want to store the new token in localStorage
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
      });
  };

  const windowsUrlTokenizer = () => {
    const windowsUrlToken = window.location.hash.match(/access_token=([^&]*)/);
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
