@echo off

REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps

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

REM Sync with the checked-out branch (pull changes)
git pull

REM Get the branch names from the command line argument (e.g., 'branch1,branch2,branch3')
SET branchNames=%1

REM Check if branch names were provided
IF NOT "%branchNames%"=="" (
  REM Split branch names using a comma as a delimiter
  FOR %%a IN (%branchNames%) DO (
    REM Check out the current branch
    git checkout %%a 2>nul

    REM Merge with 'develop'
    git merge develop

    REM Check if the remote branch exists before pushing
    git rev-parse --verify --quiet origin/%%a
    IF %ERRORLEVEL% EQU 0 (
      REM Push changes to the remote 'origin'
      git push origin %%a
    ) ELSE (
      echo Remote branch '%%a' does not exist. Skipping push.
    )
  )
)

REM Exit the batch script
exit /b 0
