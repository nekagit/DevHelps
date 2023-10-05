REM Change to the directory where your Git repository is located
npm install
pause
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
