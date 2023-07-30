FROM node:18.17-alpine

WORKDIR /var/www/soa

# EXPOSE 3000

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]