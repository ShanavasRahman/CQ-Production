const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res) => {
    
    const token = req.cookies.authToken;
    if (!token) {
        console.log("no token");

      return res.status(401).json({ message: "Token not found" });
    }
    try {
      JWT.verify(token, JWT_SECRET);
      console.log("Route protected");
      
      res.status(200).json({ message: "Route protected" });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };

module.exports = {
  auth,
};
