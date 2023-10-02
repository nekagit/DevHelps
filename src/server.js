/* eslint-disable no-undef */
import { exec } from "child_process";
import cors from "cors";
import express from "express";
import path from "path";


var client_id = '20da193795de4266b95a81dc7c086624'; // Your client id
var client_secret = 'aab5a168f1d64e9484d4cee3f5c6282c'; // Your secret
var redirect_uri = 'http://localhost:5137'; // Your redirect uri
rateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(request())
app.use(querystring())
app.use(cookieParser())

// Function to execute a script sequentially
const executeScriptsSequentially = async (scriptName, scriptParameter) => {

  // Define the path to the script file (assuming it's in the src/scripts directory)
  const scriptPath = path.join(
    "C:\\Users\\NenadKalicanin\\Desktop\\DevHelps\\src\\scripts",
    scriptName
  );

    console.log(`Executing script with parameter:${scriptName} ${scriptParameter}`);

    // Execute each script using exec
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

// Endpoint to execute a npm script by name
app.post("/execute-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;
    console.log(scriptName);
    if(scriptParameters != undefined){

      console.log(scriptParameters, "scriptparameters");
      const scriptParameterss = Array.isArray(scriptParameters) ? scriptParameters : scriptParameters.split(",");
      console.log(scriptParameterss, "array parameters");
      for (const scriptParameter of scriptParameterss) {
        console.log(scriptParameter, "currentparameter")
        await executeScriptsSequentially(scriptName, scriptParameter);
      }
    }else {

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

  console.log("login anfang")
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

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

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
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

