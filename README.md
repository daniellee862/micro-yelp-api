# Rated Restaurants - A Micro 'Yelp' API  🍔   

I created an API that returns ratings and cuisine for different restaurants with the ability to add new restaurants, update their details, and delete them as needed.

I used Node.js / [node-postgres](https://node-postgres.com/) for the backend and [PostgreSQL](https://www.postgresql.org/) for the database 🚀


## Installation ⚙️

1.Clone the repository.

2.Install the required dependencies.

```bash 
  cd my-project
  npm install my-project
```

3.Set up the database and seed it with initial data.

```bash 
  npm run setup-db
  npm run run-seed
```

4.Configure the database connection settings in the db.js file to match your PostgreSQL setup.


Now you're all set to run the API using npm start and start exploring the various endpoints 🔥

```bash 
  npm start
```
    
## Database 💾

The installation created two databases that share the following tables;

#### Areas Table

| area_id            | name    |
| ------------------ | ------- |
| SERIAL PRIMARY KEY | VARCHAR |

Areas `have many` Restaurants (see below)

#### Restaurants Table

| restaurant_id      | name    | area_id                  | cuisine | website |
| ------------------ | ------- | ------------------------ | ------- | ------- |
| SERIAL PRIMARY KEY | VARCHAR | INT REFERENCES Areas(id) | VARCHAR | VARCHAR |

Restaurants `have many` Ratings (see below)

#### Ratings Table

The rating must be an integer with a minimum value of one and a maximum value of five.

| rating_id          | restaurant_id                  | rating  | created_at                                   |
| ------------------ | ------------------------------ | ------- | -------------------------------------------- |
| SERIAL PRIMARY KEY | INT REFERENCES Restaurants(id) | INTEGER | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP |

A rating does not need to know which Area the Restaurant it `belongs to` is in.


Both of the databases share the following table setup:


## API Reference 🌐

#### 1. GET /api 🍟

Responds with a JSON object containing a 'message' key.

```json
  {
  "message": "all ok"
  }
```
Does not interact with the database and serves as a simple check to ensure the API is up and running.

#### 2. GET /api/restaurants 🍕

Responds with a JSON object containing an array of all restaurant objects.

```json
  {
  "restaurants": [
    // ... restaurant objects
  ]
  }
```

#### 3. POST /api/restaurants 🌭

Adds a new restaurant to the database and responds with the newly created restaurant object.

Example Request Body:

```json
  {
  "restaurant_name": "The Codfather",
  "area_id": 2,
  "cuisine": "British",
  "website": "www.thecodfather.com"
  }
  ```

Example Response:

```json
  {
  "restaurant": {
    "restaurant_id": 9,
    "restaurant_name": "The Codfather",
    "area_id": 2,
    "cuisine": "British",
    "website": "www.thecodfather.com"
  }
  }
  ```

#### 4. DELETE /api/restaurants/:restaurant_id 🍦
Deletes the specified restaurant from the database and responds with a 204 No Content status.

#### 5. PATCH /api/restaurants/:restaurant_id 🍔
Updates the area_id field of the specified restaurant and responds with the updated restaurant object

Example Request Body:

```json
  // PATCH /api/restaurants/3 - example request body:
  {
  "area_id": 2 // <--- was previously area_id 3 for this restaurant
  }
  ```

Example Response:

```json
  {
  "restaurant": {
    "restaurant_id": 3,
    "restaurant_name": "Rudys Pizza",
    "area_id": 2,
    "cuisine": "Neapolitan Pizzeria",
    "website": "http://rudyspizza.co.uk/"
  }
}
  ```

#### 6. GET /api/areas/:area_id/restaurants 🍿
Responds with a JSON object containing the area details, including a count of the restaurants in that area and an array of those restaurants.

Example Response:

```json
{
  "area": {
    "area_id": 1,
    "name": "Northern Quarter",
    "total_restaurants": 4,
    "restaurants": [
      //  ... area 1 restaurants
    ]
  }
}

  ```

#### 7. GET /api/restaurants (with average_rating) 🍗
This endpoint updates the existing /api/restaurants endpoint to include an average_rating property for each restaurant object. The average_rating is calculated based on the ratings associated with that restaurant.

