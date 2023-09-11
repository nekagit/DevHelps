/* eslint-disable no-undef */
import { exec } from "child_process";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Function to execute a script sequentially
const executeScriptsSequentially = async (scriptName, scriptParameter) => {

  // Define the path to the script file (assuming it's in the src/scripts directory)
  const scriptPath = path.join(
    "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
    scriptName
  );

    console.log(`Executing script with parameter: ${scriptParameter}`);

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
      console.log(scriptParameterss);
      for (const scriptParameter of scriptParameterss) {
        
        await executeScriptsSequentially(scriptName, scriptParameter);
      }
    }
        await executeScriptsSequentially(scriptName, "");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
