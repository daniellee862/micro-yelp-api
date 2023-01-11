const {
  fetchRestaurants,
  insertRestaurant,
  deleteRestaurantById,
  updateRestaurantById
} = require("./models");

const getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

const getRestaurants = (req, res) => {
  fetchRestaurants().then((restaurants) => {
    res.status(200).send({ restaurants });
  });
};

const addRestaurant = (req, res) => {
  const { body } = req;

  if (Object.keys(body).length > 0) {
    insertRestaurant(body).then((newRestaurant) => {
      res.status(201).send({ newRestaurant });
    });
  } else {
    res.status(201).send();
  }
};

const deleteRestaurant = (req, res) => {
  const { restaurant_id } = req.params;
  deleteRestaurantById(restaurant_id).then(() => {
    res.status(204).send();
  });
};

const updateRestaurant = (req, res) => {
    const { restaurant_id } = req.params;
    const { body } = req;
    if (Object.keys(body).length > 0) {
        updateRestaurantById(restaurant_id, body).then((updatedRestaurant) => {
            res.status(200).send({updatedRestaurant});
      });
    } 
      else {
        res.status(200).send();
    }
}

module.exports = {
  getMessage,
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant
};
