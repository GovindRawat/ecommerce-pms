# Use official Node.js LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source
COPY src ./src

# Expose application port
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
CMD wget -q --spider http://localhost:3000/health || exit 1

# Start the Express server
CMD ["npm", "start"]