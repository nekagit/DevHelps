REM Change to the directory where your Git repository is located
cd C:\Users\NenadKalicanin\Desktop\Git\PBD\src\pbd.core.frontend-react
set testClass=%1

npm run test %testClass%
REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
