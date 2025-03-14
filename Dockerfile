FROM node:18.15.0-alpine AS base

# ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install 
# RUN npm run dev


FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app
COPY --from=base /app /app

USER nonroot

CMD ["node","server.js"]
