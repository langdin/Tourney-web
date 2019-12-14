
let passport = require("passport");

let jwt = require("jsonwebtoken");
let DB = require("../config/db");

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; // alias

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      return res.json({ success: false, msg: "Incorrect username or password." });
    }
    req.logIn(user, err => {
      // server error?
      if (err) {
        return next(err);
      }

      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      };

      const authToken = jwt.sign(payload, DB.secret, {
        expiresIn: 604800 // 1 Week
      });

      return res.json({
        success: true,
        msg: "User Logged in Successfully!",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email
        },
        token: authToken
      });
    });
  })(req, res, next);
};

module.exports.processRegisterPage = (req, res, next) => {
  // define a new user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        console.log("Error: User Already Exists!");
      }
      return res.json({
        success: false,
        msg: "ERROR: Failed to Register User. Please try again."
      });
    } else {
      // if no error exists, then registration is successful

      // return succes message
      return res.json({ success: true, msg: "User Registered Successfully!" });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: "User Successfully Logged out!" });
};


module.exports.editUser = (req, res, next) => {
  let updatedUser = User({
    _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.update({ _id: req.body._id }, updatedUser, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Edited User",
        user: updatedUser
      });
    }
  });
};

module.exports.getUser = (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, userObj) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Edited User",
        user: userObj
      });
    }
  });
};
