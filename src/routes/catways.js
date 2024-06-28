const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catways");
const catwayPrivate = require("../middlewares/private");

/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - type
 *         - catwayState
 *       properties:
 *         catwayNumber:
 *           type: string
 *           description: Numéro du catway
 *         type:
 *           type: string
 *           enum: [court, long]
 *           description: Type de catway (court ou long)
 *         catwayState:
 *           type: string
 *           enum: [disponible, indisponible]
 *           description: État du catway (disponible ou indisponible)
 *       example:
 *         catwayNumber: CW150
 *         type: court
 *         catwayState: disponible
 * 
 *   responses:
 *     UnauthorizedError:
 *       description: Non autorisé - JWT invalide ou non fourni
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: JWT invalide
 *     NotFoundError:
 *       description: Le catway spécifié n'existe pas
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Catway non trouvé
 *     InternalServerError:
 *       description: Erreur de serveur lors de la requête
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Erreur interne du serveur
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/", catwayPrivate.checkJWT, catwayController.getCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupérer un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/:id", catwayController.getCatwayById);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Ajouter un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post("/", catwayPrivate.checkJWT, catwayController.addCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Mettre à jour un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.put("/:id", catwayController.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Mettre à jour partiellement un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *                 description: Nouvel état du catway
 *                 enum: [disponible, indisponible]
 *     responses:
 *       200:
 *         description: Catway mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.patch("/:id", catwayController.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.delete("/:id", catwayPrivate.checkJWT, catwayController.deleteCatway);

module.exports = router;
