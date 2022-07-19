const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const foodRoutes = require("./routes/foodRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

//this js file server.js runs just once setting up the express server, middlewares, routes etc
//on the running of the app. The code is parsed from top to bottom, one after the other. The middlewares are only just set up. The middlewares don't run until a request is set from client or user agent to our server. Then the request passes through the middleware stack and a response is set back depending on the order and functionality of the middlewares already set up.
//the callback of app.listen is only called when this app is done parsing its code from top to bottom irregardless of where app.listen is put (either top most or bottom);
//app.use is just like a collective method for any http request to the server e.g get, post, delete etc. This is why our middlewares always run for ALL request types e.g get, post, put, delete etc

const app = express();
const port = process.env.PORT || 8080;

console.log("APP 1");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("1st custom middleware before the routes");
  next();
});

app.use((req, res, next) => {
  console.log("2nd custom middleware before the routes");
  next();
});

app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  console.log("3rd custom middleware after the routes");
  next();
});

console.log("APP 2");

if (process.env.NODE_ENV === "production") {
  console.log("IN PRODUCTION");
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  );
} else {
  console.log("IN DEVELOPMENT");
  app.get("/", (req, res) => {
    res.send({ message: "Welcome to BGmeals API" });
  });
}

app.use("*", (req, res) => {
  res.status(400).send({ error: "unknown route" });
});

console.log("APP 3");

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

console.log("APP 4");
