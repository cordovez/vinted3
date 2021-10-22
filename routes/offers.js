////  THIS PAGES' DEPENDENCIES ////
const express = require("express"); //toujours nécessaire: active "express"
const Offer = require("../models/Offer");
const router = express.Router(); // car les requêtes sont séparées dans /routes
// const User = require("../models/User"); // trouve le model dan /models/User
// const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const isAuthenticated = require("../middlewares/Authentication");

//// NEW OFFER ///
router.post("/offer/publish", isAuthenticated, async (req, res) => {
  //   console.log(req.fields);
  //   res.json(req.fields);
  try {
    console.log(req.fields);
    console.log(req.files.picture.path);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
  const newOffer = await new Offer({
    product_name: req.fields.title,
    product_description: req.fields.description,
    product_price: req.fields.price,
    product_details: [
      { MARQUE: req.fields.brand },
      { TAILLE: req.fields.size },
      { COULEUR: req.fields.color },
      { EMPLACEMENT: req.fields.city },
    ],
  });
  // product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  const image = await cloudinary.uploader.upload(req.files.picture.path);
  // j'envoie mon image sure cloudinary
  newOffer.product_image = image;

  await newOffer.save();
  res.json(newOffer);
});

//// ALL OFFERS ////
router.get("/offers", isAuthenticated, async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

//// ONE OFFER: by ID////
router.get("/offer", isAuthenticated, async (req, res) => {
  const selectOffer = await Offer.findById(req.query.id);
  res.json(selectOffer);
});

//// FILTERED OFFER ////
router.get("/offer", isAuthenticated, async (req, res) => {
  console.log(req.query);
});

module.exports = router;
