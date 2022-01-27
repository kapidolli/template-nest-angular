FROM node:17.4.0 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build:ssr

FROM node:17.4.0
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run serve:ssr
