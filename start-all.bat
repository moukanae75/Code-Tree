@echo off
echo ==============================================
echo        Starting CodeTree V2 Microservices       
echo ==============================================
echo.

echo [1/6] Starting Discovery Service (Eureka)...
start "Discovery Service" cmd /k "cd discovery-service && mvnw.cmd spring-boot:run || mvn spring-boot:run"
echo Waiting 15 seconds for Discovery Service to initialize...
timeout /t 15 > nul

echo [2/6] Starting Gamification Service...
start "Gamification Service" cmd /k "cd gamification-service && mvnw.cmd spring-boot:run || mvn spring-boot:run"
timeout /t 3 > nul

echo [3/6] Starting Identity Service...
start "Identity Service" cmd /k "cd identity-service && dotnet run"
timeout /t 3 > nul

echo [4/6] Starting Content Service...
start "Content Service" cmd /k "cd content-service && dotnet run"
timeout /t 3 > nul

echo [5/6] Starting Code Engine (Moulinette)...
start "Code Engine" cmd /k "cd code-engine && .\venv\Scripts\python main.py"
timeout /t 3 > nul

echo [6/6] Starting API Gateway...
start "API Gateway" cmd /k "cd gateway-service && mvnw.cmd spring-boot:run || mvn spring-boot:run"


echo.
echo ==============================================
echo All services are starting in separate windows!
echo Please wait a minute for all of them to register with Eureka.
echo ==============================================
pause
