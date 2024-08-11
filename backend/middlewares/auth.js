import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ status: false, message: "Token is not valid" });
  }
};

export default verifyUser;
