# lottie-assessment
Sample application for uploading and viewing JSON lotties

# For building the app locally.

# CLIENT
- Extract the code.
- Run npm install or yarn install . 
- Set parameters accordingly in .env file.
- Run `npm run dev` to start the server in development mode.

# SERVER
- Extract the code.
- Run npm install.
- Make sure postgres database is installed on the system.
- Set parameters accordingly in .env file.
- Run `npm start` to start the server.

# Dockerizing the application.
# clean out your existing containers and volumes if you want to start fresh
- docker rm $(docker ps -a -f status=exited -q); docker volume prune -f
- docker-compose up --build # --build will rebuild the images, if you want to start in the background add -d
- docker-compose down # stop the containers