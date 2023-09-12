@echo off

REM Change to the directory where your Git repository is located
cd C:\Users\NenadKalicanin\Desktop\Git\PBD\src\pbd.core.frontend-react
npm run start

REM Exit the batch script
exit
taskkill /F /PID %PROCESSID%
