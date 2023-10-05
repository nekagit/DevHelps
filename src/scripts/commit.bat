@echo off
REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

IF NOT "%currentBranch%"=="develop" (

REM Stage all changes, including new files
git add --all

REM Get the commit message from the command line argument (e.g., 'My commit message')
SET commitMessage=%1

REM Check if a commit message was provided
IF "%commitMessage%"=="" (
  echo Please provide a commit message as a parameter.
  exit /b 1
)

REM Commit all changes with the provided message
git commit -a -m "%commitMessage%"

)

REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
