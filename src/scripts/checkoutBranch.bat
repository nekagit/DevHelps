REM Get the current branch name
FOR /F %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET currentBranch=%%i

REM Check if the current branch is 'develop', 'master', or 'main'
IF NOT "%currentBranch%"=="develop" (
    REM If it's 'develop', just push the changes
    git add --all
    git commit -m "Auto-commit changes"
    git pull
    git push
) 

REM Get the new branch name from the command line argument (e.g., 'new-branch-name')
SET checkoutBranch=%1
echo %checkoutBranch%

REM Attempt to checkout 'develop'
git checkout %checkoutBranch% 2>nul

echo Successfull checkout to %checkoutBranch%
pause
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
