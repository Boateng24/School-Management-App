FROM node:lts-bullseye-slim@sha256:d93fb5c25db163dc795d40eabf66251a2daf6a2c6a2d21cc29930e754aef4c2c as builder

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json* ./
COPY tsconfig.json ./

RUN npm config set unsafe-perm true
COPY prisma ./prisma

RUN npm install
RUN npm run generate

COPY . .

RUN npm run build


#----- Staging
FROM node:lts-bullseye-slim@sha256:d93fb5c25db163dc795d40eabf66251a2daf6a2c6a2d21cc29930e754aef4c2c as stager

ENV NODE_ENV production
WORKDIR /usr/app

RUN npm config set unsafe-perm true

COPY --from=builder /usr/app/package.json ./
COPY --from=builder /usr/app/package-lock.json ./
COPY --chown=node:node prisma ./prisma

RUN npm install --prod

#----- Production
FROM node:lts-bullseye-slim@sha256:d93fb5c25db163dc795d40eabf66251a2daf6a2c6a2d21cc29930e754aef4c2c as prod

WORKDIR /usr/app
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

COPY --from=stager /usr/app/package.json ./
COPY --from=stager /usr/app/package-lock.json ./
COPY --from=builder /usr/app/build ./build
COPY --from=stager /usr/app/node_modules ./node_modules
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node entrypoint.sh ./

RUN chown -R node /usr/app

RUN chmod +x ./entrypoint.sh

EXPOSE ${PORT_NUMBER}

USER node

CMD ["npm ","run", "start"]