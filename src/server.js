import axios from "axios";
import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
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
app.get('/refresh_token', async function(req, res) {
  var refresh_token = req.query.refresh_token;
  const client_id = "20da193795de4266b95a81dc7c086624";
  const client_secret = "aab5a168f1d64e9484d4cee3f5c6282c";
  
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + ((`${client_id}:${client_secret}`).toString('base64'))
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })
  };
  try {
    const response = await axios(authOptions);
    console.log(response.data);
    if (response.status === 200) {
      var access_token = response.data.access_token;
      res.send({
        'access_token': access_token
      });
    } else {
      res.status(response.status).send({ 'error': 'Unable to refresh token' });
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).send({ 'error': 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
