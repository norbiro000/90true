FROM node

RUN npm install nodemon -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app
RUN npm install

VOLUME ["/usr/src/app"]

EXPOSE 3000

CMD npm start