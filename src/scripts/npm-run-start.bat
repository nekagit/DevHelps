@echo off
npm run start
taskkill /F c/PID %PROCESSID%
exit
