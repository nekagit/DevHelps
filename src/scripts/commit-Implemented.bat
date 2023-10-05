@echo off

REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

REM Check if the current branch is 'develop', 'master', or 'main'
IF NOT "%currentBranch%"=="develop" (


REM Stage all changes, including new files
git add --all

REM Check if there are any changes to commit
git diff-index --quiet HEAD
IF %ERRORLEVEL% NEQ 0 (
  REM Commit all changes with the message "First Implementation"
  git commit -a -m "Update"
)

REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

REM For other branches, push and set the upstream branch (publish)
git push --set-upstream origin %currentBranch%

) 

REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
