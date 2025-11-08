import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // if token not present not logget in 
      return res
        .status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    // Decoding token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({message: "Unauthorized - Invalid Token"});   
    }
    const user = await User.findById(decode.userId).select("-password"); // -password to exclude password field 

    if(!user){
        return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next(); // calling next to run next middleware 

  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
