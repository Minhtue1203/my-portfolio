# Multi-stage build for optimized production image
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the website files into Nginx's default directory
COPY . /usr/share/nginx/html

# Remove unnecessary files from the container
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf \
    && rm -rf /usr/share/nginx/html/.git /usr/share/nginx/html/.github \
    && rm -f /usr/share/nginx/html/.gitignore /usr/share/nginx/html/.gitattributes

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
