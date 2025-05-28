# Dockerfile
FROM mcr.microsoft.com/playwright:focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the server files
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
