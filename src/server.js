import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";


const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.post("/execute-script", async (req, res) => {
  try {
    const { scriptName, scriptParameters, path: targetPath } = req.body;
    if (scriptParameters != "") {
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
const executeScriptsSequentially = async (scriptName, scriptParameter, targetPath) => {
 
  const scriptPath = path.join(
    targetPath + "\\src\\scripts",
    scriptName
  );
  console.log(targetPath)

  const gitCommand =  `cd /d ${targetPath} && start cmd /K "${scriptPath} ${scriptParameter}"`
  const npmCommand =  `cd /d ${targetPath}\\src\\scripts && start ` + scriptName + " " + targetPath
  const finalCommand = scriptName.startsWith("npm") ?  npmCommand : gitCommand
  console.log("\n",finalCommand, "\n")
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



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});