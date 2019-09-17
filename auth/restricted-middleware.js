// const bcrypt = require("bcryptjs");

// const Users = require("../users/users-model.js");

// module.exports = (req, res, next) => {
//   let { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "You cannot pass!" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ message: "Ran inot an unexpected error" });
//       });
//   } else {
//     res.status(400).json({ message: "No credentials provided" });
//   }
// };

module.exports = (req, res, next) => {
  // is the user logged in === do we have information about the user in our session
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
};
