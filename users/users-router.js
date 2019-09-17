const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");

const Users = require("./users-model.js");

const restricted = require("../auth/restricted-middleware.js");
router.use(express.json());

router.get("/", (req, res) => {
  res.send("It's alive!");
});

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // <<<<<<<<<<<<<<<
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You cannot pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/hash", (req, res) => {
  const name = req.query.name;

  // hash the name
  const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
  res.send(`the hash for ${name} is ${hash}`);
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message: "you can check out anytime you like, but you can never leave"
        });
      } else {
        res.status(200).json({ message: "bye" });
      }
    });
  } else {
    res.status(200).json({ message: "already logged out" });
  }
});

module.exports = router;
