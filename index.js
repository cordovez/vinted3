//// USE CORS ////
const cors = require("cors");

//// HIDE SENSITIVE INFORMATION ////
// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

//// start dependencies ////
const express = require("express"); //toujours nécessaire: active "express"
const formidable = require("express-formidable"); //toujours nécessaire: nous donne l'habilité de parser fields en syntax de JSON dans "body"
const mongoose = require("mongoose"); //toujours nécessaire: pour gérer access a mongo et "models"

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); // ici on re-nomme "express()"
app.use(formidable()); // faire express utiliser formidable
app.use(cors());

// se connecter a la BDD en utilisant le nom que on veut le donner
mongoose.connect(process.env.MONGODB_URI); // Vous pourrez vous connecter à votre base de données, sans pour autant préciser les identifiants dans le fichier index.js

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
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
