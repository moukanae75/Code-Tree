import requests

try:
    res = requests.post("http://localhost:5026/api/auth/register", json={
        "firstName": "test",
        "lastName": "user",
        "email": "test@test.com",
        "password": "TestPassword123!"
    })
    print(f"Status: {res.status_code}")
    print(f"Body: {res.text}")
except Exception as e:
    print(f"Error: {e}")
