FROM node:10.19.0

#Location of source code
ENV PROJECT_ROOT /opt/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

#Install package
COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .

#copy source file to build process
COPY ./frontend/tsconfig.json .
COPY ./frontend/public ./public
COPY ./frontend/src ./src

#install dependencies
RUN yarn -g --silence

#Expose port to make sure that port is free
EXPOSE 80

#Build the app
CMD ["yarn", "start"]
