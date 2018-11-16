FROM node:8.11

WORKDIR /criminal-watch

ADD . /criminal-watch

RUN npm install -g forever

RUN npm install -g apidoc

RUN npm install

RUN npm run doc

EXPOSE 3000

CMD [ "npm", "run", "forever" ]