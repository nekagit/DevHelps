import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";


const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's URL
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const executeScriptsSequentially = async (scriptName, scriptParameter, targetPath) => {
  const scriptPath = path.join(
    targetPath + "\\src\\scripts",
    scriptName
  );
  const finalPath = targetPath;
  console.log(finalPath)
  const finalCommand =  `cd /d "${finalPath}" && start cmd /K "${scriptPath} ${scriptParameter}"`
  
  await new Promise((resolve, reject) => {
    exec(finalCommand, (error) => {
      if (error) {
        reject(`Error executing script: ${error.message}`);
      } else {
        resolve();
      }
    });
  });
};
app.post("/execute-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters, path: targetPath } = req.body;
    if (scriptParameters != undefined) {
      const scriptParameterss = Array.isArray(scriptParameters)
        ? scriptParameters
        : scriptParameters.split(",");
      for (const scriptParameter of scriptParameterss) {
        await executeScriptsSequentially(scriptName, scriptParameter, targetPath);
      }
    } else {
      await executeScriptsSequentially(scriptName, "", targetPath);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});