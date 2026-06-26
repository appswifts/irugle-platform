@echo off
cd /d "C:\Users\FH\Desktop\projects\PURE\irugle.com remake"
start "Irugle Dev Server" cmd /k "node node_modules\next\dist\bin\next dev -p 3000"
