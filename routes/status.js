const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const bookingsPath = path.join(__dirname, "../data/bookings.json");

// POST /check-status
router.post("/", (req, res) => {
  const { pnr } = req.body;

  // Read latest bookings
  const bookings = JSON.parse(fs.readFileSync(bookingsPath));

  const booking = bookings.find(b => b.pnr === pnr);

  if (!booking) {
    return res.json({
      status: "error",
      message_en: "Booking not found.",
      message_hi: "बुकिंग नहीं मिली।"
    });
  }

  res.json({
    status: "success",
    booking,
    message_en: `Booking found for PNR ${pnr}.`,
    message_hi: `PNR ${pnr} के लिए बुकिंग मिली।`
  });
});

module.exports = router;
