/* eslint-disable no-undef */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51Q6lzTBiRPssmQoCWja8jsbjMjnv80Xpt9v6GPtaLoH9hAKZ2RT2lJtAUkIisBpVhDvH1bYtoNXHwlay957vZvRM00OxovgaGB"
);

// APP configuration
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// exmaple endpoint
//(http://127.0.0.1:5001/clone-d7aff/us-central1/api).

// API Route
app.get("/", (req, res) => res.status(200).send("Hello, worlsd!"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  //OK - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Export the function correctly
exports.api = functions.https.onRequest(app);
