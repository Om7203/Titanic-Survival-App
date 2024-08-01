from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import logging
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from schemas import Passenger  # Ensure correct import
from preprocess import preprocess  # Import the preprocess function

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to allow specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained models
models = {
    "logistic_regression": joblib.load("/app/models/logistic_regression_model.pkl"),
    "svm": joblib.load("/app/models/svm_model.pkl"),
    "knn": joblib.load("/app/models/knn_model.pkl"),
    "random_forest": joblib.load("/app/models/random_forest_model.pkl"),
    "decision_tree": joblib.load("/app/models/decision_tree_model.pkl"),
}

class ModelResponse(BaseModel):
    model_name: str
    survival_probability: float

# Endpoint to check the status of the service
@app.get("/status")
async def status():
    return {"status": "ok"}

# Endpoint to get logs (dummy logs for example purposes)
@app.get("/logs")
async def get_logs():
    logs = [
        "Log 1: Model logistic_regression loaded successfully.",
        "Log 2: Model svm loaded successfully.",
        "Log 3: Model knn loaded successfully.",
        "Log 4: Model random_forest loaded successfully.",
        "Log 5: Model decision_tree loaded successfully."
    ]
    return {"logs": logs}

# Prediction endpoint
@app.post("/predict", response_model=List[ModelResponse])
async def predict(passenger: Passenger, model_names: Optional[List[str]] = None):
    if model_names is None:
        model_names = list(models.keys())

    predictions = []
    
    for model_name in model_names:
        model = models.get(model_name)
        if not model:
            logging.error(f"Model {model_name} not found")
            continue

        try:
            passenger_data = preprocess(passenger)  # Use the preprocess function
            survival_probability = model.predict_proba(passenger_data)[0, 1]
            predictions.append(ModelResponse(model_name=model_name, survival_probability=survival_probability))
        except Exception as e:
            logging.error(f"Error during prediction with model {model_name}: {e}")
            raise HTTPException(status_code=500, detail=f"Error during prediction with model {model_name}: {e}")

    return predictions

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
