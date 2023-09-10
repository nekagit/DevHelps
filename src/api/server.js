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
const executeGitScript = (scriptName, scriptParameters) => {
  return new Promise((resolve, reject) => {
    // Define the path to the script file (assuming it's in the src/scripts directory)
    const scriptPath = path.join(
      "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
      scriptName
    );
      console.log(scriptParameters)
    // Create a terminal instance to run the script
    const terminal = spawn("cmd.exe", ["/c", scriptPath, ...scriptParameters]);

    // Capture the output of the terminal
    let output = "";

    terminal.stdout.on("data", (data) => {
      output += data.toString();
    });

    terminal.stderr.on("data", (data) => {
      output += data.toString();
    });

    terminal.on("close", (code) => {
      if (code === 0) {
        resolve({
          success: true,
          message: "Git script executed successfully",
          output,
        });
      } else {
        reject({
          success: false,
          message: `Error executing Git script. Exit code: ${code}`,
          output,
        });
      }
    });
  });
};

// Endpoint to execute a Git script by name
app.post("/execute-git-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters } = req.body;
    console.log(scriptName)
    console.log(scriptParameters)
    const result = await executeGitScript(scriptName, scriptParameters);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
