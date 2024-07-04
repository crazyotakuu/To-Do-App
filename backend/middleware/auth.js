const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  console.log("In auth, checking for the jwt token and replacing bearer! ")
  const token = req.header('Authorization').replace('Bearer ', '');
  

  // Check if no token
  if (!token) {
    console.log("There's no token present in the req header")
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    console.log("Trying to verify token! ")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Token is not valid, Error:",err.message)
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
