# Use an official Node runtime as a parent image
FROM node:14

#ENV
ARG SECRET_KEY
ARG NODE_ENV

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/
RUN npm install

# Bundle app source including the public and src directories
COPY ./public /app/public
COPY ./src /app/src
#COPY ./.env /app/.env



# Run npm start when the container launches
#RUN REACT_APP_SECRET_KEY=${SECRET_KEY}
#RUN REACT_APP_NODE_ENV=${NODE_ENV} 

#RUN npm run build

# COPY --from=build /app/build /usr/share/nginx/html
# # Make port 3000 available to the world outside this container
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

CMD ["npm", "start"]
