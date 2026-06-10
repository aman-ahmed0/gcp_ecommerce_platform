# Start from Node.js 20 (slim version keeps it small)
FROM node:20-slim

# Create and set working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Next.js dev server uses port 3000
EXPOSE 3000

# Start the development server, binding to all network interfaces
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]