FROM node:18.15.0-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port (optional but recommended)
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
