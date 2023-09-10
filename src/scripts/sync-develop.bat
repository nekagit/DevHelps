@echo off

REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps


REM Check if a branch name is provided as an argument
IF "%~1"=="" (
  echo Branch name is missing. Usage: sync-develop.bat branchName
  exit /b 1
)

REM Check the current branch name
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set current_branch=%%i

REM Check if the current branch is one of 'develop', 'master', or 'main'
If NOT "%current_branch%"=="develop" (
  git add --all
  REM Check if there are any changes to commit
  git diff-index --quiet HEAD
  IF %ERRORLEVEL% NEQ 0 (
      REM Commit the changes with a default message
      git commit -m "Auto-commit changes"
      git pull
      git push
  ) 

  REM Attempt to checkout 'develop'
  git checkout develop 2>nul

)
REM Sync with the 'develop' branch (pull changes)
git pull

REM Get the branch name from the command line argument
SET branchName=%~1

REM Check out the specified branch
git checkout %branchName% 2>nul

REM Merge with 'develop'
git merge develop

REM Check if the remote branch exists before pushing
git rev-parse --verify --quiet origin/%branchName%
IF %ERRORLEVEL% EQU 0 (
  REM Push changes to the remote 'origin'
  git push origin %branchName%
) ELSE (
  echo Remote branch '%branchName%' does not exist. Skipping push.
)

REM Exit the batch script
exit /b 0