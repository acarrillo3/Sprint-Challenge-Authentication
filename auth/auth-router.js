const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Auth = require("./auth-model");

router.post("/register", (req, res) => {
  // implement registration
  const creds = req.body;
  const hashedPassword = bcrypt.hashSync(creds.password, 8);

  creds.password = hashedPassword;

  if (creds.username && creds.password) {
    Auth.addUser(creds)
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
});

module.exports = router;
