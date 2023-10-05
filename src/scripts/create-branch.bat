pause
REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

IF NOT "%currentBranch%"=="develop" (
git add --all
git commit -m "Auto-commit changes"
git pull
git push
)
REM Attempt to checkout 'develop'
git checkout develop 2>nul

REM Get the new branch name from the command line argument (e.g., 'new-branch-name')
SET newBranchName=%1
echo %newBranchName%

REM Check if newBranchName is not empty
IF NOT "%newBranchName%"=="" (
  REM Create a new branch with the specified name
  git checkout -b %newBranchName%
  
  REM Publish the newly created branch
  git push -u origin %newBranchName%
) ELSE (
  echo New branch name is empty. No branch created.
)

REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
