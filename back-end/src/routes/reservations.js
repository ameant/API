const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations");
const reservationPrivate = require("../middlewares/private");

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - clientName
 *         - boatName
 *         - checkIn
 *         - checkOut
 *       properties:
 *         catwayNumber:
 *           type: string
 *           description: Numéro du catway
 *         clientName:
 *           type: string
 *           description: Nom du client
 *         boatName:
 *           type: string
 *           description: Nom du bateau
 *         checkIn:
 *           type: string
 *           description: Date et heure d'arrivée
 *         checkOut:
 *           type: string
 *           description: Date et heure de départ
 *       example:
 *         catwayNumber: "CW100"
 *         clientName: "Jane Doe"
 *         boatName: "Bateau ABC"
 *         checkIn: "30/05/2024"
 *         checkOut: "30/09/2024"
 * 
 *   responses:
 *     NotFoundError:
 *       description: Réservation non trouvée
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Réservation non trouvée
 *     InternalServerError:
 *       description: Erreur de serveur lors de la gestion des réservations
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Erreur de serveur lors de la gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupère toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 *   post:
 *     summary: Crée une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 * /reservations/{id}:
 *   get:
 *     summary: Récupère une réservation par son identifiant
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 *   delete:
 *     summary: Supprime une réservation par son identifiant
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation à supprimer
 *     responses:
 *       204:
 *         description: Réservation supprimée avec succès
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/", reservationPrivate.checkJWT, reservationController.getReservations);
router.get("/:id", reservationController.getReservationById);
router.post("/", reservationPrivate.checkJWT, reservationController.addReservation);
router.delete("/:id", reservationPrivate.checkJWT, reservationController.deleteReservation);

module.exports = router;
