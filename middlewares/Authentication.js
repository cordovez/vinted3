// 3. add the model that holds user information
const User = require("../models/User");

//// Middleware: Authentication Process ////
const isAuthenticated = async (req, res, next) => {
  // added exceptions: 5a. has the req(est) sent a token?
  if (req.headers.authorization) {
    // 1. who is being authenticated? Try to find them by their token and ... //
    const user = await User.findOne({
      // 2. re-label the sent req.headers.authorization
      token: req.headers.authorization.replace("Bearer ", ""), // make "token" with what is passed by 'req', but without "Bearer "
    });

    // 6a. if the token has been sent (see  #5), but does the user exist?:
    if (user) {
      req.user = user; // if so, we add the user to the req(est)
      next();
      // 6b. the user was not found
    } else {
      res.status(401).json({ message: "User does not exist (6a)" });
    }
    // 5b. the token was not sent ...
  } else {
    res.status(401).json({ message: "Unauthorized, no token sent (5a)" });
  }
};

// 4. allow process to continue with next step

module.exports = isAuthenticated; // * always necessary to be able to use elsewhere
