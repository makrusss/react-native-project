FROM node

WORKDIR /apps

ENV PORT=4000

COPY package.json . 
COPY package-lock.json . 

RUN npm install

RUN npm install -g nodemon
# Bundle app source
COPY . .

CMD ["node","app.js"]