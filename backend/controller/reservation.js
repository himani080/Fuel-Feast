// import ErrorHandler from "../error/error.js";
// import { Reservation } from "../models/reservationSchema.js";

// export const sendReservation = async (req, res, next) => {
//   const { firstName, lastName, email, date, time} = req.body;
//   if (!firstName || !lastName || !email || !date || !time ) {
//     return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
//   }

//   try {
//     await Reservation.create({ firstName, lastName, email, date, time});
//     res.status(201).json({
//       success: true,
//       message: "Reservation Sent Successfully!",
//     });
//   } catch (error) {
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return next(new ErrorHandler(validationErrors.join(', '), 400));
//     }

//     // Handle other errors
//     return next(error);
//   }
// };


// export default sendReservation;


import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

// 1. Create a new reservation
export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time } = req.body;
  if (!firstName || !lastName || !email || !date || !time) {
    return next(new ErrorHandler("Please fill the full reservation form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time });
    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

// 2. Get a reservation by ID
export const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }
    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    return next(error);
  }
};

// 3. Update a reservation by ID
export const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Reservation updated successfully!",
      reservation,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

// 4. Delete a reservation by ID
export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

// 5. List all reservations (with optional filters)
export const listReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find(req.query);
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  sendReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  listReservations,
};
// crud