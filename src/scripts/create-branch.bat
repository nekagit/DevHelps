@echo off

REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps

git add -all

REM Check if there are any changes to commit
git diff-index --quiet HEAD
IF %ERRORLEVEL% NEQ 0 (
  REM Commit the changes with a default message
  git commit -m "Auto-commit changes"
  git push
)

REM Attempt to checkout 'develop'
git checkout develop 2>nul

REM If the checkout to 'develop' fails, try 'master'
IF %ERRORLEVEL% NEQ 0 (
  git checkout master 2>nul

  REM If the checkout to 'master' fails, try 'main'
  IF %ERRORLEVEL% NEQ 0 (
    git checkout main 2>nul
  )
)

git add -all
REM Check if there are any changes to commit
git diff-index --quiet HEAD
IF %ERRORLEVEL% NEQ 0 (
  REM Commit the changes with a default message
  git commit -m "Auto-commit changes"
  git push

)

REM Sync with the checked-out branch (pull changes)
git pull

REM Get the new branch name from the command line argument (e.g., 'new-branch-name')
SET newBranchName=%1

REM Create a new branch with the specified name
IF NOT "%newBranchName%"=="" (
  git checkout -b %newBranchName%
)

REM Exit the batch script
exit /b 0
