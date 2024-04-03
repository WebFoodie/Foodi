const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 6001;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// console.log(process.env.ACCESS_TOKEN_SECRET);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.mtdws7f.mongodb.net/demo-foodi-client`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// jwt authentication
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});



// Import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require('./api/routes/paymentRoutes')

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use('/payments',paymentRoutes)

// stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: [  "card" ],

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.get("/",(req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
