FROM node:20-alpine

WORKDIR /app

# Copy root package.json and yarn.lock for Yarn Workspaces
COPY package.json yarn.lock ./

# Copy backend-specific files
COPY backend/package.json backend/prisma/ ./backend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma Client
RUN cd backend && npx prisma generate

# Copy the rest of the backend code
COPY backend/ ./backend/

# Build the NestJS application
RUN yarn workspace backend build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["yarn", "workspace", "backend", "start:prod"]