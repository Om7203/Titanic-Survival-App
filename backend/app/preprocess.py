import numpy as np

def preprocess(passenger):
    # Convert Title to numerical value, assuming specific mapping
    title_map = {"Mr.": 0, "Mrs.": 1, "Miss": 2, "Master": 3}
    title = title_map.get(passenger.Title, -1)  # Default to -1 if title is not found

    data = np.array([[title, passenger.Pclass, passenger.Sex, passenger.Age, passenger.Fare, passenger.IsAlone, passenger.Embarked, passenger.AgeClass]])
    return data
