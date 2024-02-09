const jwt = require("jsonwebtoken");

require("dotenv").config();

export function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_KEY);
}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")[1];

    if (!bearerToken) {
      res.status(401);
    }

    jwt.verify(bearer, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403);
      }
    });

    next();
  }
}
