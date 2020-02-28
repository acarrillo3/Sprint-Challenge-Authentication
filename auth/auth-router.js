const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hashedPassword = bcrypt.hashSync(user.password, 8);

  user.password = hashedPassword;

  if (user.username && user.password) {
    Users.addUser(user)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Problem adding the user. Try again later." });
      });
  } else {
    res.status(400).json({ message: "Please enter a username and password" });
  }
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  if (username && password) {
    Users.findBy(username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${username}` });
        } else {
          res.status(401).json({ message: "Invalid credentials!" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Problem logging in user. Try again later." });
      });
  } else {
    res.status(400).json({ message: "Please enter a username and password" });
  }
});

module.exports = router;
