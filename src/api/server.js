/* eslint-disable no-undef */
import { exec } from "child_process";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Function to execute a Git script
const executeGitScript = (scriptName, scriptParameters) => {
  return new Promise((resolve, reject) => {
    // Define the path to the script file (assuming it's in the src/scripts directory)
    const scriptPath = path.join(
      "C:\\Users\\Nenad\\Desktop\\DevsHelp\\DevHelps\\src\\scripts",
      scriptName
    );
    for(let scriptParameter of scriptParameters) {
      console.log(scriptParameter)
    // Execute the script with the branch name as an argument
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
  }


  });


};

// Endpoint to execute a Git script by name
app.post("/execute-git-script", async (req, res) => {
  try {
    const { scriptName, scriptParameter } = req.body;

    const result = await executeGitScript(scriptName, scriptParameter);
    if (result.success) {
      res.status(200).json({ message: "Git script executed successfully" });
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
