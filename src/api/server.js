/* eslint-disable no-undef */
import { exec } from "child_process";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());






// Function to execute a Git script sequentially
const executeGitScriptsSequentially = async (scriptName, scriptParameters) => {
  const scriptParameterss = Array.isArray(scriptParameters) ? scriptParameters : [scriptParameters];
  console.log(scriptParameterss);

  // Define the path to the script file (assuming it's in the src/scripts directory)
  const scriptPath = path.join(
    "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
    scriptName
  );

  for (const scriptParameter of scriptParameterss) {
    console.log(`Executing script with parameter: ${scriptParameter}`);

    // Execute each script using exec
    await new Promise((resolve, reject) => {
      exec(`"${scriptPath}" "${scriptParameter}"`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing Git script: ${error.message}`);
        } else {
          console.log(stdout);
          console.error(stderr);
          resolve();
        }
      });
    });
  }
};

// Endpoint to execute a Git script by name
app.post("/execute-git-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;
    console.log(scriptName);
    console.log(scriptParameters);

    await executeGitScriptsSequentially(scriptName, scriptParameters);

    res.status(200).json({
      success: true,
      message: "All Git scripts executed successfully",
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
