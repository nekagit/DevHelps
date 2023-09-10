/* eslint-disable no-undef */
import { spawn } from "child_process";
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
  console.log(scriptParameterss) 
 for (const scriptParameter of scriptParameterss) {
      // Define the path to the script file (assuming it's in the src/scripts directory)
      const scriptPath = path.join(
        "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
        scriptName
      );

      console.log(`Executing script with parameter: ${scriptParameter}`);
      
      const terminal = spawn("cmd.exe", ["/c", scriptPath, scriptParameter], {
        detached: true,
        stdio: "inherit", // Allows you to see the terminal
      });

      await new Promise((resolve, reject) => {
        terminal.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(`Error executing Git script. Exit code: ${code}`);
          }
        });
      });
  }
};

// Endpoint to execute a Git script by name
app.post("/execute-git-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;
    console.log(scriptName)
    console.log(scriptParameters)

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
