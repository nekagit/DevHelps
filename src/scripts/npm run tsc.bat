REM Change to the directory where your Git repository is located
cd C:\Users\Nenad\Desktop\DevsHelp\DevHelps

npm run tsc 2>&1 > tsc_errors.txt
pause
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
