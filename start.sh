#!/bin/bash
echo "Building and running the application..."
docker-compose up --build

echo "Opening the app in your default browser..."
xdg-open http://localhost:3000
