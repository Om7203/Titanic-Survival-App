# frontend/Dockerfile

# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /frontend

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the required dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Specify the command to run on container start
CMD ["npm", "start"]
