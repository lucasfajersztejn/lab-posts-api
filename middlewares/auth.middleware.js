const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  const token = req.headers.cookie;

  if (!token) {
    return res.status(401).json({ message: "authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}