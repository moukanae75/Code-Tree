@echo off
echo ==============================================
echo        Stopping CodeTree V2 Microservices       
echo ==============================================
echo.

for %%P in (8761 8080 8082 5026 5229 8000) do (
    echo Freeing port %%P...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%%P ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo All services on microservice ports have been stopped.
echo ==============================================
pause
