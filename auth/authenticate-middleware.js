/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = "this is a secret";

  if (token) {
    jwt.verify(token, secret, (err, token) => {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.token = token;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please try loggin in again!" });
  }
};
