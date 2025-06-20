const jwt = require("jsonwebtoken");

// Middleware to verify JWT and check roles
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
            console.log("request is logged"+req);
            
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // ✅ Now it's safe to split
console.log("Received Token:", token); 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details to request object

        // console.log("Decoded JWT:", decoded); // Debugging line

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};


// Middleware to check required role
const checkRole = (roles) => {
    return (req, res, next) => {
        console.log("User Role:", req.user.role); 
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied. Unauthorized Role." });
        }
        next();
    };
};



exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified User:", verified);  // Debugging ke liye
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};


exports.checkRole = (roles) => {
    return (req, res, next) => {
        console.log("Checking Role for:", req.user);  // Debugging ke liye
        if (!req.user || !roles.includes(req.user.role)) {
            console.log("Unauthorized Access:", req.user.role);  // Debugging log
            return res.status(403).json({ message: "Access Denied. Unauthorized Role." });
        }
        next();
    };
};



module.exports = { verifyToken, checkRole };

