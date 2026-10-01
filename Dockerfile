# 1. Use the official Node.js runtime as a parent image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first to cache dependencies
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --only=production

# 5. Copy the rest of your application source code (src, app.js, etc.)
COPY . .

# 6. Expose the port your Express app runs on (matching your default port)
EXPOSE 5000

# 7. Define the command to run your app
CMD ["node", "src/app.js"]

