npm run tsc 2>&1 > tsc_errors.txt
pause
exit
taskkill /F /PID %PROCESSID%
