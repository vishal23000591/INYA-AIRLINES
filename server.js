const express = require("express");
const cors = require("cors");
const fs = require("fs");

const bookingRoutes = require("./routes/booking");
const statusRoutes = require("./routes/status");
const cancelRoutes = require("./routes/cancel");
const bookingsListRoutes = require("./routes/bookingList");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/book-flight", bookingRoutes);
app.use("/check-status", statusRoutes);
app.use("/cancel-flight", cancelRoutes);
app.use("/bookings", bookingsListRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Inya Airlines API Running 🚀");
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
