import axios from "axios";
import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import querystring from "querystring";

const client_id = '20da193795de4266b95a81dc7c086624'; // Your client id
const redirect_uri = 'http://localhost:5137'; // Your redirect uri

const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const executeScriptsSequentially = async (scriptName, scriptParameter) => {
  const scriptPath = path.join(
    "C:\\Users\\NenadKalicanin\\Desktop\\DevHelps\\src\\scripts",
    scriptName
  );

  console.log(`Executing script with parameter:${scriptName} ${scriptParameter}`);

  await new Promise((resolve, reject) => {
    exec(`start cmd /K "${scriptPath} ${scriptParameter}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing script: ${error.message}`);
      } else {
        console.log(stdout);
        console.error(stderr);
        console.log("heheh");

        resolve();
      }
    });
  });
};

app.post("/execute-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;
    console.log(scriptName);
    if (scriptParameters != undefined) {
      console.log(scriptParameters, "scriptparameters");
      const scriptParameterss = Array.isArray(scriptParameters) ? scriptParameters : scriptParameters.split(",");
      console.log(scriptParameterss, "array parameters");
      for (const scriptParameter of scriptParameterss) {
        console.log(scriptParameter, "currentparameter");
        await executeScriptsSequentially(scriptName, scriptParameter);
      }
    } else {
      await executeScriptsSequentially(scriptName, "");
    }

    res.status(200).json({
      success: true,
      message: "All scripts executed successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', async function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);

    try {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        data: querystring.stringify({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const authResponse = await axios(authOptions);

      const access_token = authResponse.data.access_token;
      const refresh_token = authResponse.data.refresh_token;

      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
      };

      const spotifyResponse = await axios(options);

      console.log(spotifyResponse.data);

      res.redirect('/#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } catch (error) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  }
});

app.get('/refresh_token', async function (req, res) {
  var refresh_token = req.query.refresh_token;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const authResponse = await axios(authOptions);
    const access_token = authResponse.data.access_token;
    res.send({
      'access_token': access_token
    });
  } catch (error) {
    // Handle error
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
