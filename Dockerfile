FROM node:16.10-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/SportsStore/ /usr/share/nginx/html 
#get the application name from angular.json

#https://dev.to/usmslm102/containerizing-angular-application-for-production-using-docker-3mhi

#docker build . -t usmslm102/sampleapp

#docker run -p 3000:80 usmslm102/sampleapp 