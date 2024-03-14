FROM node:18 as frontend
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build


FROM node:18 as backend
WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
COPY ./backend ./
COPY --from=frontend /app/frontend/dist /app/backend/dist

EXPOSE 3000

CMD [ "npm", "start" ]

