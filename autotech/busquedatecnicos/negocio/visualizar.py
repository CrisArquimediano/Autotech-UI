import requests

url = "https://api-rest-pp1.onrender.com/api/tecnicos/"

data = requests.get(url)

if data.status_code == 200:
    data = data.json()
    print(data)