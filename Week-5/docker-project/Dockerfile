# Base image
FROM node:18

# Install curl
RUN apt-get update && apt-get install -y curl

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
