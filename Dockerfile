FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

# RUN sed -i "s/mongodb:\/\/localhost/mongodb:\/\/mongo/" common/services/mongoose.service.js

RUN npm install

EXPOSE 7980

CMD ["npm", "run", "start"]
