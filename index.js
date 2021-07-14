const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});



const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/`;

const connectWithRetry = () => {mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('successfully'))
  .catch((e) => {
    setTimeout(() => {
      connectWithRetry
    }, 10000);
  });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('<h2>Hello cc nek<h2>');
});



app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("<h2>Hi  There cc nek</h2>");
  console.log("yeah it ran");
});

//localhost:3000/api/v1/post/
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
