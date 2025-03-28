# FROM node:18.15.0
FROM node:16

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon as a development dependency
RUN npm install -g nodemon

# Copy application code
COPY . .

# Set environment variable
ENV MONGO_URI="mongodb+srv://blogme:5065@blogme.49ua2.mongodb.net/?retryWrites=true&w=majority&appName=blogme"

# Expose port (optional but recommended)
EXPOSE 4000

# Start the application using the dev script
CMD ["npm", "run", "dev"]
