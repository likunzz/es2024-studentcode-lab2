# Dockerfile
FROM node:20

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Set environment variable for MongoDB URI
ENV MONGO_URI mongodb://mongodb-container:27017/testdb

EXPOSE 3000
CMD ["node", "app.js"]
