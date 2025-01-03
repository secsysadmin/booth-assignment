@echo off
echo Building and running the application...
docker-compose up --build

echo Opening the app in your default browser...
start http://localhost:3000

pause
