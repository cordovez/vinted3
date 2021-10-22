//// start dependencies ////
const express = require("express"); //toujours nécessaire: active "express"
const formidable = require("express-formidable"); //toujours nécessaire: nous donne l'habilité de parser fields en syntax de JSON dans "body"
const mongoose = require("mongoose"); //toujours nécessaire: pour gérer access a mongo et "models"

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "cordovez",
  api_key: "588179619975318",
  api_secret: "YDbny6rdboJVQwXHF8xsDIUvPgc",
});

const app = express(); // ici on re-nomme "express()"
app.use(formidable()); // faire express utiliser formidable

// se connecter a la BDD en utilisant le nom que on veut le donner
mongoose.connect("mongodb://localhost/Vinted");

// import de routes:
const userRoute = require("./routes/users");
const offerRoute = require("./routes/offers");
// activer les routes:
app.use(userRoute); // pas de ""
app.use(offerRoute);

// en cas qu'il n'ya pas de route ...
app.all("*", (req, res) => {
  res.json("that page does not exist");
});

// démarrer le serveur
app.listen(3000, () => {
  console.log("Server Started 🚀");
});
