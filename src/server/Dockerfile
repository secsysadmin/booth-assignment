# # Base image
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the app files
# COPY . .

# # Expose port and start server
# EXPOSE 5000
# CMD ["node", "server.js"]

# Use the Node.js LTS image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the server listens on
EXPOSE 5000

# Command to start the backend server
CMD ["npm", "start"]
