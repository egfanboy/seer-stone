FROM node:10.16-alpine

COPY ./dist ./seer

WORKDIR /seer

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node ./bundle
