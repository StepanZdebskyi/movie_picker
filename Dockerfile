# STAGE 1: Build the React Application
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies (cache this layer for speed)
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# STAGE 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (required for React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]