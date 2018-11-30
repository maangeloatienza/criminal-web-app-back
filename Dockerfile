FROM node:8.11

WORKDIR /criminal-watch

ADD . /criminal-watch

RUN npm install nodemon -g

RUN npm install apidoc -g

RUN npm install

EXPOSE $PORT

CMD [ "nodemon"]