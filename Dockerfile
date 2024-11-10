FROM node:18.15.0-alpine AS base

ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app
COPY * /app

RUN npm install --production



FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app
COPY --from=base /app /app

USER nonroot

CMD ["server.js"]
