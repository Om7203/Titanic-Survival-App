from pydantic import BaseModel

class Passenger(BaseModel):
    Title: str
    Pclass: int
    Sex: int
    Age: int
    Fare: int
    IsAlone: int
    Embarked: int
    AgeClass: float
