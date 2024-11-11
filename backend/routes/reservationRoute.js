// import express from "express";
// import { sendReservation } from "../controller/reservation.js";
// const router = express.Router();
// router.post("/send",sendReservation);
// export default router;

import express from "express";
import { 
  sendReservation, 
  getReservationById, 
  updateReservation, 
  deleteReservation, 
  listReservations 
} from "../controller/reservation.js";

const router = express.Router();

// Route to create a new reservation
router.post("/send", sendReservation);

// Route to get all reservations
router.get("/", listReservations);

// Route to get a specific reservation by ID
router.get("/:id", getReservationById);

// Route to update a reservation by ID
router.put("/:id", updateReservation);

// Route to delete a reservation by ID
router.delete("/:id", deleteReservation);

export default router;
