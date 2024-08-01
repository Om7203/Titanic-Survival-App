import joblib
import os

models_dir = "./backend/app/models"
models = {}

def load_models():
    for filename in os.listdir(models_dir):
        if filename.endswith(".pkl"):
            model_name = os.path.splitext(filename)[0]  # Remove .pkl extension
            model_path = os.path.join(models_dir, filename)
            try:
                with open(model_path, "rb") as f:
                    models[model_name] = joblib.load(f)
                print(f"Loaded model {model_name} from {model_path}")
            except Exception as e:
                print(f"Failed to load model {model_name}: {str(e)}")

if __name__ == "__main__":
    load_models()
