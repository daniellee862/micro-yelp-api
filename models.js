const { db } = require("./db/connection");

const fetchRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((result) => {
    return result.rows;
  });
};

const insertRestaurant = (restaurant) => {
  return db
    .query(
      `
  INSERT INTO restaurants
  (restaurant_name, area_id, cuisine, website)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *;
  `,
      [
        restaurant.restaurant_name,
        restaurant.area_id,
        restaurant.cuisine,
        restaurant.website,
      ]
    )
    .then((newRestaurant) => {
      return newRestaurant.rows[0];
    });
};

const deleteRestaurantById = (restaurant_id) => {
  return db.query(`DELETE FROM restaurants WHERE restaurant_id = $1 ;`, [
    restaurant_id,
  ]);
};

const updateRestaurantById = (restaurant_id, restaurantBody) => {
  return db.query(`
  UPDATE restaurants
  SET $1 = $2
  WHERE restaurant_id = $3
  RETURNING *;
  `, [restaurantBody, restaurantBody.area_id, restaurant_id])
  .then((updatedRestaurant) => {
    return updatedRestaurant.rows[0];
  });
}


module.exports = { fetchRestaurants, insertRestaurant, deleteRestaurantById, updateRestaurantById };
