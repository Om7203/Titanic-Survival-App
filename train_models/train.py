import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
import joblib

# Load the training dataset
train_df = pd.read_csv('train.csv')  # Replace with your actual path

# Drop features that are not required
train_df = train_df.drop(['Ticket', 'Cabin'], axis=1)

# Create new feature: Title
train_df['Title'] = train_df.Name.str.extract(r' ([A-Za-z]+)\.', expand=False)

# Replace titles with common names or classify as 'Rare'
train_df['Title'] = train_df['Title'].replace(
    ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona'], 'Rare')
train_df['Title'] = train_df['Title'].replace('Mlle', 'Miss')
train_df['Title'] = train_df['Title'].replace('Ms', 'Miss')
train_df['Title'] = train_df['Title'].replace('Mme', 'Mrs')

# Map titles to numerical values
title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
train_df['Title'] = train_df['Title'].map(title_mapping).fillna(0)

# Drop features that are no longer needed
train_df = train_df.drop(['Name', 'PassengerId'], axis=1)

# Convert Sex feature to numerical
train_df['Sex'] = train_df['Sex'].map({'female': 1, 'male': 0}).astype(int)

# Guess missing Age values
guess_ages = np.zeros((2, 3))
for i in range(0, 2):
    for j in range(0, 3):
        guess_df = train_df[(train_df['Sex'] == i) & (train_df['Pclass'] == j + 1)]['Age'].dropna()
        age_guess = guess_df.median()
        guess_ages[i, j] = int(age_guess / 0.5 + 0.5) * 0.5

for i in range(0, 2):
    for j in range(0, 3):
        train_df.loc[(train_df.Age.isnull()) & (train_df['Sex'] == i) & (train_df['Pclass'] == j + 1), 'Age'] = guess_ages[i, j]

train_df['Age'] = train_df['Age'].astype(int)

# Create Age bands and replace Age with ordinals
train_df['AgeBand'] = pd.cut(train_df['Age'], 5)
train_df.loc[train_df['Age'] <= 16, 'Age'] = 0
train_df.loc[(train_df['Age'] > 16) & (train_df['Age'] <= 32), 'Age'] = 1
train_df.loc[(train_df['Age'] > 32) & (train_df['Age'] <= 48), 'Age'] = 2
train_df.loc[(train_df['Age'] > 48) & (train_df['Age'] <= 64), 'Age'] = 3
train_df.loc[train_df['Age'] > 64, 'Age'] = 4
train_df = train_df.drop(['AgeBand'], axis=1)

# Create new feature: FamilySize
train_df['FamilySize'] = train_df['SibSp'] + train_df['Parch'] + 1

# Create new feature: IsAlone
train_df['IsAlone'] = 0
train_df.loc[train_df['FamilySize'] == 1, 'IsAlone'] = 1
train_df = train_df.drop(['Parch', 'SibSp', 'FamilySize'], axis=1)

# Create new feature combining Age and Pclass
train_df['Age*Class'] = train_df.Age * train_df.Pclass

# Fill missing Embarked values
freq_port = train_df.Embarked.dropna().mode()[0]
train_df['Embarked'] = train_df['Embarked'].fillna(freq_port)
train_df['Embarked'] = train_df['Embarked'].map({'S': 0, 'C': 1, 'Q': 2}).astype(int)

# Fill missing Fare values and convert Fare feature to ordinal values
train_df['Fare'] = train_df['Fare'].fillna(train_df['Fare'].dropna().median())
train_df['FareBand'] = pd.qcut(train_df['Fare'], 4)
train_df.loc[train_df['Fare'] <= 7.91, 'Fare'] = 0
train_df.loc[(train_df['Fare'] > 7.91) & (train_df['Fare'] <= 14.454), 'Fare'] = 1
train_df.loc[(train_df['Fare'] > 14.454) & (train_df['Fare'] <= 31), 'Fare'] = 2
train_df.loc[train_df['Fare'] > 31, 'Fare'] = 3
train_df = train_df.drop(['FareBand'], axis=1)

# Prepare data for model training
X_train = train_df.drop("Survived", axis=1)
Y_train = train_df["Survived"]

# Define models
models = {
    "logistic_regression": LogisticRegression(max_iter=200),
    "svm": SVC(probability=True),
    "knn": KNeighborsClassifier(n_neighbors=3),
    "random_forest": RandomForestClassifier(n_estimators=100),
    "decision_tree": DecisionTreeClassifier()
}

# Ensure the models directory exists
models_dir = "/Users/hardiknavadiya/Desktop/S_E @final/backend/app/models"
os.makedirs(models_dir, exist_ok=True)

# Train and save models
for name, model in models.items():
    print(f"Training {name} model...")
    model.fit(X_train, Y_train)
    joblib.dump(model, f"{models_dir}/{name}_model.pkl")
    print(f"{name} model saved successfully.")

print("All models trained and saved successfully.")
