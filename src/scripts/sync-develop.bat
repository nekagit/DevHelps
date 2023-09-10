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

REM Process branch names passed as separate arguments
:process_branches
IF "%~1"=="" (
  REM All branch names have been processed
  goto :done
)

REM Check out the current branch (argument)
git checkout %1 2>nul

REM Merge with 'develop'
git merge develop

REM Check if the remote branch exists before pushing
git rev-parse --verify --quiet origin/%1
IF %ERRORLEVEL% EQU 0 (
  REM Push changes to the remote 'origin'
  git push origin %1
) ELSE (
  echo Remote branch '%1' does not exist. Skipping push.
)

REM Shift the first argument to process the next branch name
shift
goto :process_branches

:done

REM Exit the batch script
exit /b 0
