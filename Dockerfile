FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# Use environment variables for API URL
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:3100/

CMD ["npm", "run", "dev"]
