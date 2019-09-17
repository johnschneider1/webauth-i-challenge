const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session"); // <<<<<<<<<<<<<<<<<<<<<
const KnexSessionStore = require("connect-session-knex")(session); // gotcha

const UsersRouter = require("./users/users-router");
const dbConnection = require("./data/dbconfig.js");

const server = express();

// Middleware

// Session cookies

const sessionConfig = {
  name: "krumkake", // would name the cookie sid by default
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 // clean out expired session data
  })
};

server.use(express.json());
server.use(logger);
server.use(cors({ credentials: true }));
server.use(helmet());
server.use(session(sessionConfig)); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

server.use("/api", UsersRouter);

const corsConfig = {
  origin: "http://localhost:3000"
  // credentials: true
};
server.use(cors(corsConfig));

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
