const request = require("supertest");
const app = require("../app.js");
const { db } = require("../db/connection.js");
const { seed } = require("../db/seed");
const data = require("../db/data/index.js");

const restaurants = [
  {
    area_id: 1,
    cuisine: "Mexican",
    restaurant_id: 1,
    restaurant_name: "Luck Lust Liquor & Burn",
    website: "http://lucklustliquorburn.com/",
  },
  {
    area_id: 2,
    cuisine: "Gastropub and Grill",
    restaurant_id: 2,
    restaurant_name: "The Oast House",
    website: "http://theoasthouse.uk.com/",
  },
  {
    area_id: 3,
    cuisine: "Neapolitan Pizzeria",
    restaurant_id: 3,
    restaurant_name: "Rudys Pizza",
    website: "http://rudyspizza.co.uk/",
  },
  {
    area_id: 1,
    cuisine: "Family Run Indian Curryhouse",
    restaurant_id: 4,
    restaurant_name: "This & That",
    website: "http://www.thisandthatcafe.co.uk/",
  },
  {
    area_id: 1,
    cuisine: "Pies And More Pies",
    restaurant_id: 5,
    restaurant_name: "Pieminister",
    website: "",
  },
  {
    area_id: 2,
    cuisine: "Australasian Cuisine",
    restaurant_id: 6,
    restaurant_name: "Australasia",
    website: "http://australasia.uk.com/",
  },
  {
    area_id: 1,
    cuisine: "Late night food",
    restaurant_id: 7,
    restaurant_name: "Dehli 2 go",
    website: "http://delhi2go-online.co.uk/",
  },
  {
    area_id: 3,
    cuisine: "Chic Thai Eatery",
    restaurant_id: 8,
    restaurant_name: "Vivid Lounge",
    website: "http://www.vividlounge.uk/",
  },
];

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api", () => {
  describe("GET", () => {
    test("Status code: 200", () => {
      return request(app).get("/api").expect(200);
    });
    test("Status 200: Returns message to clarify connection", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ message: "all ok" });
        });
    });
  });
});

describe("/api/restaurants", () => {
  describe("GET", () => {
    test("Status code: 200", () => {
      return request(app).get("/api/restaurants").expect(200);
    });

    test("Status code: 200 and returns json object containing array of restaurants", () => {
      return request(app)
        .get("/api/restaurants")
        .expect(200)
        .then((result) => {
          expect(result.body).toEqual({ restaurants: restaurants });
        });
    });
  });
  describe("POST", () => {
    test("Status code: 201", () => {
      return request(app).post("/api/restaurants").expect(201);
    });
    test("Status code: 201, returns restaurant object with all correct keys", () => {
      return request(app)
        .post("/api/restaurants")
        .send({
          restaurant_name: "The Codfather",
          area_id: 2,
          cuisine: "British",
          website: "www.thecodfather.com",
        })
        .expect(201)
        .then((result) => {
          expect(result.body.newRestaurant).toHaveProperty("restaurant_id");
          expect(result.body.newRestaurant).toHaveProperty("restaurant_name");
          expect(result.body.newRestaurant).toHaveProperty("area_id");
          expect(result.body.newRestaurant).toHaveProperty("cuisine");
          expect(result.body.newRestaurant).toHaveProperty("website");
        });
    });
  });

  describe("DELETE", () => {
    test("status code: 204", () => {
      return request(app).delete("/api/restaurants/1").expect(204);
    });

    test("Status code: 204 & removes correct restaurant", () => {
      return request(app)
        .delete("/api/restaurants/1")
        .expect(204)
        .then(() => {
          return db.query(`SELECT * FROM restaurants;`);
        })
        .then((result) => {
          const restaurantArray = result.rows;
          expect(restaurantArray[0].restaurant_id).not.toBe(1);
        });
    });
  });

  describe("PATCH", () => {
    test("Status code: 200", () => {
        return request(app)
        .patch("/api/restaurants/1")
        .expect(200)
    });
    test("Status code: 200 and returns updated restaurant object from database", () => {
        return request(app)
        .patch("/api/restaurants/1")
        .send({
            area_id: 2,
          })
        .expect(200)
        .then((restaurant) => {
            expect(restaurant.area_id).toBe(2);
        });
    });
  });
});
