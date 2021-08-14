
# Some dummy command lines
## Some dummy api testing commands 

```
docker run -d --name test -p 3000:3000 -v `pwd`:/app node-app

curl -d '{"username":"lvl", "password":"12345678"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users

curl -d '{"title":"lvl post", "body":"cc nek"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/posts
```
## 3. Build and attach services to new container
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d ```

# Production 

## 1. Only build for node app service and not dependencies (mongo, nginx, redis, ect)
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app
```
## 2. Docker build and push to Dockerhub
```
# only build node app service
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --no-deps -d node-app
# publish it
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app
```
## 3. We shoud use Watchtower to automate updating/refactor app process
```
docker run -d \
--name watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
containrrr/watchtower \
--trace \
--debug \
-i 50 \
[containerId/name to watch]
```
## 4. Docker Swarm
```
# 1
docker swarm init
# 2 
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml [app-name]
# 3 monitoring
docker node 
docker stack services [app-name]
```



