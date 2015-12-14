FROM node:4.2.2

RUN mkdir -p /var/app/current
WORKDIR /var/app/current

COPY . /var/app/current/
RUN npm install
RUN npm run dist
RUN rm -rf /var/app/current/src

ENV NODE_ENV production

EXPOSE 4000

ENTRYPOINT ["node", "./dist/app"]
