const express = require("express");
const {
  getMessage,
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant
} = require("./controllers.js");

const app = express();
//comment
app.use(express.json());

app.get("/api", getMessage);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", addRestaurant);

app.delete("/api/restaurants/:restaurant_id", deleteRestaurant);

app.patch("/api/restaurants/:restaurant_id", updateRestaurant);

module.exports = app;
