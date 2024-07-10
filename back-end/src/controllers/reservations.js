const Reservation = require("../models/reservation");

/**
 * Récupère toutes les réservations
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Liste}
 */
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Récupère une réservation par son identifiant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.getReservationById = async (req, res) => {
  const id = req.params.id;

  try {
    let reservation = await Reservation.findById(id);

    if (reservation) {
      return res.status(200).json(reservation);
    }

    return res.status(404).json("Réservation non trouvée");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Crée une réservation
 * @param {express.Request} req Objet de requête Express contenant les données de la réservation à créer
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.addReservation = async (req, res) => {
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

/**
 * Supprime une réservation existante
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête HTTP
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.deleteReservation = async (req, res) => {
  const id = req.params.id;

  try {
    await Reservation.deleteOne({ _id: id });

    return res.status(204).json("Réservation supprimée");
  } catch (error) {
    return res.status(501).json(error);
  }
};
