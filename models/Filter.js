const mongoose = require("mongoose");

const Filter = mongoose.model("Filter", {
  title: String,
  priceMin: Number,
  priceMax: Number,
  sort: String, //["price-desc", "price-asc"],
  page: Number,
});

module.exports = Filter;
