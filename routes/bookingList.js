const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));
  res.json(bookings);
});

module.exports = router;
