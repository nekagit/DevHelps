@echo off
npm run start
exit
taskkill /F /PID %PROCESSID%
