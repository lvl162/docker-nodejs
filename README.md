
# Some dummy docker commands 
```
docker run -d --name test -p 3000:3000 -v `pwd`:/app node-app

curl -d '{"username":"lvl", "password":"12345678"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users

curl -d '{"title":"lvl post", "body":"cc nek"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/posts
```


# Production 
## 1. Only build for node app service and not dependencies (mongo, nginx, redis, ect)
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app
```
## 2. We shoud use Watchtower to automate updating/refactor app process

## 3. Docker Swarm
