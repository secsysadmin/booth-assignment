# # Base image
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the app files
# COPY . .

# # Expose port and start app
# EXPOSE 3000
# CMD ["npm", "start"]


# Use the Node.js LTS image for building the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server for serving the built React app
FROM nginx:alpine

# Copy the built React app to the Nginx web root
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
