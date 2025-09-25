const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { generatePNR } = require("../utils/helpers");

// File paths
const flightsPath = path.join(__dirname, "../data/flights.json");
const bookingsPath = path.join(__dirname, "../data/bookings.json");

// Load data
let flights = JSON.parse(fs.readFileSync(flightsPath));
let bookings = JSON.parse(fs.readFileSync(bookingsPath));

// POST /book-flight
router.post("/", (req, res) => {
  const { first_name, last_name, origin_iata, destination_iata, depart_date, pax_adults, cabin_class } = req.body;

  // Find matching flight
  const flight = flights.find(
    (f) =>
      f.origin_iata === origin_iata &&
      f.destination_iata === destination_iata &&
      f.depart_date === depart_date &&
      f.fare_family === (cabin_class || f.fare_family)
  );

  if (!flight) {
    return res.json({
      status: "error",
      message_en: "No flights available.",
      message_hi: "कोई फ्लाइट उपलब्ध नहीं है।",
    });
  }

  // Generate booking
  const pnr = generatePNR();
  const booking = {
    pnr,
    first_name: first_name || "Guest",
    last_name: last_name || "Guest",
    flight_id: flight.id,
    status: "Scheduled",
    total_fare: flight.total_fare * pax_adults,
    cabin_class: cabin_class || flight.fare_family,
    pax_adults: pax_adults || 1,
    booked_at: new Date().toISOString(),
  };

  // Save booking
  bookings.push(booking);
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

  // Return both flight + booking info
  res.json({
    status: "success",
    pnr,
    flight,
    booking,
    message_en: `Your booking is confirmed. PNR ${pnr}.`,
    message_hi: `आपकी बुकिंग कन्फ़र्म हो गई है। आपका पीएनआर ${pnr} है।`,
  });
});

module.exports = router;
