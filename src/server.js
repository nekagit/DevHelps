import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import axios from "axios"

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const qmBaseDevLoginUrl = "https://dev.qmbase.com/Account/Login"
const qmBaseNenadsTicketsUrl = "https://dev.qmbase.com/api/ToDos?status=Open&status=InProgress&responsibleId=7281"
app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser());
// Store the session cookie in a variable
let sessionCookie = '';

// Assuming you have a QMBase login route
app.post('/loginQm', async (req, res) => {
  try {
    const loginData = {
      username: "nenad.kalicanin@qmbase.com",
      password: "Neno123!",
    };
    
    const response = await axios.post(qmBaseDevLoginUrl, loginData);
    if (response.status === 200) {
      const sessionCookie = response.headers['set-cookie'][0]; // Assuming the session cookie is the first in the array
    
      // Store the session cookie and use it in subsequent requests
      // Also, update the URL to the ticket URL
      const tickets = await axios.get(qmBaseNenadsTicketsUrl, {
        headers: {
          Cookie: sessionCookie,
        },
      });
      
      console.log("Ticketssssssssss",tickets)
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Login failed');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post("/execute-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters, pathDev, pathProj } = req.body;
    if (scriptParameters != undefined) {
      const scriptParameterss = Array.isArray(scriptParameters)
        ? scriptParameters
        : scriptParameters.split(",");
      for (const scriptParameter of scriptParameterss) {
        await executeScriptsSequentially(scriptName, scriptParameter, pathDev, pathProj);
      }
    } else {
      await executeScriptsSequentially(scriptName, "", pathDev, pathProj);
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

const executeScriptsSequentially = async (scriptName, scriptParameter, pathDev,pathProj) => {
  const gitCommand = `start cmd /c "cd /d ${pathDev}\\src\\scripts && ${scriptName} ${pathProj} ${scriptParameter} && pause"`;
  const npmCommand = `start cmd /c "cd /d ${pathDev}\\src\\scripts && ${scriptName} ${pathProj} ${scriptParameter} && pause"`;
  const finalCommand = scriptName.startsWith("npm") ?  npmCommand : gitCommand
  console.log(finalCommand, "scriptParameter", scriptParameter)
  await new Promise((resolve, reject) => {
    exec(finalCommand, (error) => {
      if (error) {
        reject(`Error executing script: ${error.message}`);
      } else {
        console.log("resolved")
        resolve();
      }
    });
  });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});