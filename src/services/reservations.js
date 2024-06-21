const Reservation = require("../models/reservation");

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getReservationById = async (req, res) => {
  const id = req.params.id;

  try {
    let reservation = await Reservation.findById(id);

    if (reservation) {
      return res.status(200).json(reservation);
    }

    return res.status(404).json("reservation_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.addReservation = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    checkIn: req.body. checkIn,
    checkOut: req.body.checkOut,
  };

  try {
    let reservation = await Reservation.create(temp);

    return res.status(201).json(reservation);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.deleteReservation = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Reservation.deleteOne({ _id: id });

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};
