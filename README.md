#  INYA AI AIRLINES – Flight Booking API ✈️

INYA AIRLINES is a lightweight airline booking system. It allows users to book flights, check the status of their bookings, and cancel bookings with refund details.

Deployed on Render: [https://inya-airlines-1.onrender.com](https://inya-airlines-1.onrender.com)

---

##  Features

* Book flights by entering passenger details, origin, destination, date, and cabin class.
* Check the status of your booking using a PNR.
* Cancel a confirmed booking and see the refund amount based on fare rules.
* Stores data in JSON files for simplicity (`flights.json`, `bookings.json`, `fare_rules.json`).

---

## 📂 Project Structure

```
data/
├── flights.json       # Available flights
├── bookings.json      # All confirmed bookings
├── fare_rules.json    # Cancellation rules
└── airports.json      # Airport codes & names

routes/
├── bookFlight.js      # Endpoint: /book-flight
├── checkStatus.js     # Endpoint: /check-status
└── cancelBooking.js   # Endpoint: /cancel-booking

utils/
└── helpers.js         # Helper functions (PNR generator, etc.)

server.js              # Express app entry point
README.md
```

---

##  API Endpoints

### 1️⃣ Book Flight

**POST** `/book-flight`

**Request Body**

```
{
  "first_name": "Vishal",
  "last_name": "Suresh",
  "origin_iata": "BLR",
  "destination_iata": "DEL",
  "depart_date": "2025-10-12",
  "pax_adults": 2,
  "cabin_class": "Economy"
}
```

**Success Response**

```
{
  "status": "success",
  "pnr": "ZX1AB2",
  "flight": {
    "id": "F101",
    "origin_iata": "BLR",
    "destination_iata": "DEL",
    "depart_date": "2025-10-12",
    "time": "10:00 IST",
    "fare_family": "Economy",
    "total_fare": 12450
  },
  "booking": {
    "pnr": "ZX1AB2",
    "first_name": "Vishal",
    "last_name": "Suresh",
    "status": "Scheduled",
    "pax_adults": 2,
    "total_fare": 24900
  },
  "message_en": "Your booking is confirmed. PNR ZX1AB2.",
  "message_hi": "आपकी बुकिंग कन्फ़र्म हो गई है। आपका पीएनआर ZX1AB2 है।"
}
```

---

### 2️⃣ Check Booking Status

**POST** `/check-status`

**Request Body**

```
{
  "pnr": "ZX1AB2"
}
```

**Success Response**

```
{
  "status": "success",
  "booking": {
    "pnr": "ZX1AB2",
    "first_name": "Vishal",
    "last_name": "Suresh",
    "flight_id": "F101",
    "status": "Scheduled",
    "pax_adults": 2,
    "cabin_class": "Economy"
  }
}
```

---

### 3️⃣ Cancel Booking

**POST** `/cancel-booking`

**Request Body**

```
{
  "pnr": "ZX1AB2"
}
```

**Success Response**

```
{
  "status": "success",
  "pnr": "ZX1AB2",
  "refund_amount": 17400,
  "cancellation_fee": 3500,
  "message_en": "Your booking has been cancelled. Refund amount ₹17400 will be processed.",
  "message_hi": "आपकी बुकिंग रद्द कर दी गई है। ₹17400 की वापसी राशि प्रोसेस की जाएगी।"
}
```

---

## 🛠️ Tech Stack

* Node.js with Express.js
* JSON-based storage for flights, bookings, and rules
* Deployed on Render

---

##   Future Enhancements

* Add user authentication
* Move storage from JSON files to MongoDB or PostgreSQL
* Add seat selection and meal preferences
* Integrate SMS/Email notifications for booking updates

---

##  Author

Built by Vishal (Pixel Pirates Team) for Inya Airlines Hackathon 

---
