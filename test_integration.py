import requests

GATEWAY_URL = "http://localhost:8080/api"
ENGINE_URL = "http://localhost:8000/execute"

print("--- Testing Identity Service ---")
register_data = {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@codetree.com",
    "password": "Password123!"
}
res = requests.post(f"{GATEWAY_URL}/auth/register", json=register_data)
print(f"Register: {res.status_code} - {res.text}")

login_data = {
    "email": "test@codetree.com",
    "password": "Password123!"
}
res = requests.post(f"{GATEWAY_URL}/auth/login", json=login_data)
print(f"Login: {res.status_code}")
if res.status_code == 200:
    token = res.json().get('token')
    print("Login successful, got token!")
else:
    print(res.text)

print("\n--- Testing Code Engine ---")
code_data = {
    "language": "python",
    "code": "print('Hello from CodeTree Integration Test!')"
}
res = requests.post(ENGINE_URL, json=code_data)
print(f"Code Engine: {res.status_code} - {res.json()}")

print("\n--- Testing Gamification Service ---")
res = requests.post(f"{GATEWAY_URL}/gamification/progress/testUser123/add-points?points=10")
print(f"Gamification Add Points: {res.status_code} - {res.text}")

res = requests.get(f"{GATEWAY_URL}/gamification/progress/testUser123")
print(f"Gamification Get Progress: {res.status_code} - {res.text}")
