REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps

git add --all
git commit -m "Auto-commit changes"
git pull
git push

REM Get the new branch name from the command line argument (e.g., 'new-branch-name')
SET checkoutBranch=%1
echo %checkoutBranch%

REM Attempt to checkout 'develop'
git checkout checkoutBranch 2>nul

pause
echo Successfull checkout to %checkoutBranch%
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
