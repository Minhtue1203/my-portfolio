# Use Nginx as the base image
FROM nginx:latest

# Copy the website files into Nginx's default directory
COPY ./ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
