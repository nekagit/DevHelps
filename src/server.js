import { exec } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";


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
  const gitCommand = `start cmd /c "cd /d ${pathDev}\\src\\scripts && ${scriptName} ${pathProj} ${scriptParameter}"`;
  const npmCommand = `start cmd /c "cd /d ${pathDev}\\src\\scripts && ${scriptName} ${pathProj} ${scriptParameter} && pause"`;
  const finalCommand = scriptName.startsWith("npm") ?  npmCommand : gitCommand
  console.log(finalCommand)
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
// C:\Users\Nenad\Desktop\DevsHelp\DevHelps\src


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});