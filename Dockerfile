FROM node:10.19.0

#Location of source code
ENV PROJECT_ROOT /opt/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

#Install package
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

#copy source file to build process
COPY ./frontend/tsconfig.json .
COPY ./frontend/public ./public
COPY ./frontend/src ./src

#install dependencies
RUN npm install --silence
RUN npm install react-scripts -g --silence

EXPOSE 8080

#Build the app
CMD ["npm", "start"]
