const express = require("express");
const router = express.Router();
const fs = require("fs");

const bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));
const rules = JSON.parse(fs.readFileSync("./data/rules.json"));

// POST /cancel-flight
router.post("/", (req, res) => {
  const { pnr, last_name } = req.body;

  // Read latest bookings
  const bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));

  const index = bookings.findIndex(
    b => b.pnr === pnr && b.last_name.toLowerCase() === (last_name || "").toLowerCase()
  );

  if (index === -1) {
    return res.json({
      status: "error",
      message_en: "Booking not found.",
      message_hi: "बुकिंग नहीं मिली।"
    });
  }

  const booking = bookings[index];
  const rules = JSON.parse(fs.readFileSync("./data/rules.json"));
  const fare_rule = rules.find(r => r.fare_family === booking.cabin_class) || { cancel_fee: 500 };

  booking.status = "Cancelled";
  const refund = booking.total_fare - fare_rule.cancel_fee;

  bookings[index] = booking;
  fs.writeFileSync("./data/bookings.json", JSON.stringify(bookings, null, 2));

  res.json({
    status: "success",
    refund,
    cancel_fee: fare_rule.cancel_fee,
    message_en: `Your booking is cancelled. Refund: ${refund}.`,
    message_hi: `आपकी बुकिंग कैंसिल कर दी गई है। रिफंड: ${refund}.`
  });
});
module.exports = router;