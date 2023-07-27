# Pull repository
git pull

# create networks if they doesn't exist
docker network create payless-network

# launch dockers
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# launch migrations
docker exec server_1 node migrate.js

# launch nginx for frontend
docker build -t nicolaswadoux/merchantsite ./front
docker stop merchant-front
docker rm merchant-front
docker run --name merchant-front -d -p 80:80 nicolaswadoux/merchantsite