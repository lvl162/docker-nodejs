docker run -d --name test -p 3000:3000 -v `pwd`:/app node-app

curl -d '{"username":"lvl", "password":"12345678"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users

curl -d '{"title":"lvl post", "body":"cc nek"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/posts
