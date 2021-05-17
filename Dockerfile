FROM node:14.15

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/nodejs-numer
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app/nodejs-numer
RUN npm install
# RUN npm install -g nodemon
EXPOSE 8080

CMD [ "npm", "run" ,"dev" ]

#docker  run -it --rm -d -p 8080:8080  mheak/nodejs-numerical:lastest