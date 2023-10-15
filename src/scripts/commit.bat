cd /d %1
REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

IF NOT "%currentBranch%"=="develop" (

REM Stage all changes, including new files
git add --all

REM Get the commit message from the command line argument (e.g., 'My commit message')
SET commitMessage=%2
echo %commitMessage%

SET newBranchName=%2
echo %newBranchName%
REM Commit all changes with the provided message
git commit -a -m "%commitMessage%"
git pull
git push

)



