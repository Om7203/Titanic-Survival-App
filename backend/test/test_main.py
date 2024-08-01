# backend/tests/test_main.py
import pytest
from fastapi.testclient import TestClient
from app.main import app  # Ensure this points to your FastAPI app instance

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_predict():
    response = client.post("/predict", json={
        "passenger": {
            "Pclass": 1,
            "Sex": 1,
            "Age": 25,
            "Fare": 100,
            "IsAlone": 1,
            "Embarked": 0,
            "AgeClass": 25
        },
        "model_names": ["logistic_regression"]
    })
    assert response.status_code == 200
    assert "logistic_regression" in response.json()
