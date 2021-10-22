////  THIS PAGES' DEPENDENCIES ////
const express = require("express"); //toujours nécessaire: active "express"
const router = express.Router(); // car les requêtes sont séparées dans /routes
const User = require("../models/User"); // trouve le model dan /models/User

//// AUTHENTICATION DEPENDENCIES ////
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const { findOne } = require("../models/User");

//// NEW USER ////
router.post("/user/signup", async (req, res) => {
  console.log(req.fields); // premiere verification a faire

  // declare new user parameters //
  const existingUser = await User.findOne({ email: req.fields.email });
  const salt = uid2(16);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);
  const token = uid2(16);

  try {
    if (!existingUser) {
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          phone: req.fields.phone,
          avatar: req.fields.avatar, // nous verrons plus tard comment uploader une image
        },
        token: token,
        hash: hash,
        salt: salt,
      });
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        account: newUser.account,
      });
    } else {
      res.status(400).json("A user with that email already exists");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//// USER LOGIN ////
router.post("/user/login", async (req, res) => {
  //   console.log(req.fields); // premiere verification a faire

  try {
    const email = req.fields.email;
    const password = req.fields.password;
    const existingUser = await User.findOne({ email: req.fields.email });

    const validatePassword = SHA256(password + existingUser.salt).toString(
      encBase64
    );

    if (validatePassword === existingUser.hash) {
      if (existingUser) {
        res.json({
          _id: existingUser._id,
          token: existingUser.token,
          account: existingUser.account,
        });
      } else {
        res.json("User with that email does not exist");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // const salt = uid2(16);
  // const hash = SHA256(password + salt).toString(encBase64);
  // const token = uid2(16);
});

module.exports = router; // pour que "index.js" aie access a ce fichier
