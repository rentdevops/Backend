FROM node:16.14.2

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# RUN npm uninstall mongoose
# RUN npm install mongoose@6.10.0

# Install nodemon as a development dependency
RUN npm install -g nodemon

# Copy application code
COPY . .

# Set environment variable
ENV MONGO_URI="mongodb+srv://blogme:5065@blogme.49ua2.mongodb.net/?retryWrites=true&w=majority&appName=blogme"
# ENV MONGO_URI=mongodb://grafael:Rafael1448@chatnode.c4rq4eqqc37z.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=/app/global-bundle.pem&retryWrites=false

# Expose port (optional but recommended)
EXPOSE 4000

# Start the application using the dev script
CMD ["npm", "run", "dev"]
