@echo off

REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps

REM Check if there are any changes to commit
git diff-index --quiet HEAD
IF %ERRORLEVEL% NEQ 0 (
  
  REM Stage all changes, including new files
  git add --all

  REM Commit the changes with a default message
  git commit -m "Auto-commit changes"
)

REM Attempt to checkout 'develop'
git checkout develop

REM If the checkout to 'develop' fails, try 'master'
IF %ERRORLEVEL% NEQ 0 (
  git checkout master
)

REM If the checkout to 'master' fails, try 'main'
IF %ERRORLEVEL% NEQ 0 (
  git checkout main
)

REM Sync with the checked-out branch (pull changes)
git pull

REM Get the branch names from the command line argument (e.g., 'branch1,branch2,branch3')
SET branchNames=%1

REM Check if branch names were provided
IF NOT "%branchNames%"=="" (
  REM Split the branch names into an array using a loop
  :loop
  FOR /F "tokens=1,* delims=," %%a IN ("%branchNames%") DO (
    REM Check out the current branch
    git checkout %%a

    REM Merge with 'develop'
    git merge develop

    REM Push changes to the remote 'origin'
    git push origin %%a

    REM Set branchNames to the remaining branches
    SET branchNames=%%b

    REM If there are more branches, continue the loop
    IF NOT "%branchNames%"=="" (
      GOTO loop
    )
  )
)

REM Exit the batch script
exit /b 0
