# train_models/Dockerfile

# Use the official Python image from the Docker Hub
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Upgrade pip and setuptools to specific known good versions
RUN pip install --upgrade pip setuptools

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory contents into the container at /app
COPY . /app

# Command to run the training script
CMD ["python", "train.py"]
