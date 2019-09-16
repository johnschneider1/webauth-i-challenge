const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router");

const server = express();

// Middleware
server.use(express.json());
server.use(logger);
server.use(cors());
server.use(helmet());

server.use("/api", UsersRouter);

// Sanity test for Mr. Hernandez

server.get("/", (req, res) => {
  res.status(200).json({ api: "ITS WORKING AND HERE IT IS" });
});

// custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;
