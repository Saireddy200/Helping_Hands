#!/bin/bash

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install

# Build client
npm run build

echo "Build completed successfully!"
