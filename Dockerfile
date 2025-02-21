# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the environment file
COPY .env .env

# Generate Prisma Client (Fixes your error)
RUN npx prisma generate

# Expose the application port (change if your app runs on a different port)
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
