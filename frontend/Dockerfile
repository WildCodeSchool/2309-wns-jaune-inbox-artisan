FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i --verbose
RUN apk --update --no-cache add curl

COPY src src
COPY public public

COPY tsconfig.json tsconfig.json
COPY tailwind.config.ts tailwind.config.ts
COPY postcss.config.js postcss.config.js
COPY codegen.ts codegen.ts

CMD npm run dev & npm run generate
