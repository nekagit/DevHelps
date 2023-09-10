/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
import { exec } from "child_process";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = 3000;
let isExecutingScript = false; // Flag to track if a script is currently executing

app.use(express.json());
app.use(cors());

// Function to execute a Git script sequentially
const executeGitScriptsSequentially = (scriptName, scriptParameters) => {
  if (isExecutingScript) {
    return Promise.reject({
      success: false,
      message: "Another script is already executing.",
    });
  }

  return new Promise( async (resolve, reject) => {
    isExecutingScript = true;
    try {
      // Define the path to the script file (assuming it's in the src/scripts directory)
      const scriptPath = path.join(
        "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
        scriptName
      );

      for (let scriptParameter of scriptParameters) {
        console.log(`Executing script with parameter: ${scriptParameter}`);
        // Execute the script with the branch name as an argument
        await executeScript(scriptPath, scriptParameter);
      }

      resolve({
        success: true,
        message: "All Git scripts executed successfully",
      });
    } catch (error) {
      reject(error);
    } finally {
      isExecutingScript = false;
    }
  });
};

// Function to execute a single script
const executeScript = (scriptPath, scriptParameter) => {
  return new Promise((resolve, reject) => {
    exec(`"${scriptPath}" "${scriptParameter}"`, (error) => {
      if (error) {
        reject({
          success: false,
          message: `Error executing Git script: ${error.message}`,
        });
      } else {
        resolve({
          success: true,
          message: "Git script executed successfully",
        });
      }
    });
  });
};

// Endpoint to execute a Git script by name
app.post("/execute-git-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;

    const result = await executeGitScriptsSequentially(
      scriptName,
      scriptParameters
    );

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
