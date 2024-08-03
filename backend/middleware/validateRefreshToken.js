import jwt, { decode } from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const validateRefreshToken = (req, res, next) => {
  // get the refresh token from cookie
  const { refreshToken } = req.cookie;
  if (!refreshToken) {
    return res.status(404).json({ message: "missing refresh token" });
  }
  //   validate the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "invalid refresh token" });
    }
    // attach the payload to the request object
    req.user = decoded;
    next();
  });
};

export default validateRefreshToken;
