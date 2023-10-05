set testClass=%1
npm run test %testClass%
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
