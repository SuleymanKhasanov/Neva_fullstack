FROM node:22-slim

WORKDIR /app

# Copy root package.json and yarn.lock for Yarn Workspaces
COPY package.json yarn.lock ./
COPY frontend/package.json ./frontend/

# Install dependencies
RUN yarn workspace frontend install --frozen-lockfile

# Copy the rest of the frontend code
COPY frontend/ ./frontend/

# Build the Next.js application
RUN yarn workspace frontend build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["yarn", "workspace", "frontend", "start"]