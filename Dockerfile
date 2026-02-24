# Use Node 20 slim as base
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
# We need to use node adapter for a real server, but if it's static we can use a simple server
RUN npm run build

# Stage 2: Serve the app
FROM node:20-slim AS runner

WORKDIR /app

# Install 'handler' or just use a simple static server since it's adapter-static
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/build ./build

EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
