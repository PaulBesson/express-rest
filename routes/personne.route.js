import express from 'express';
import personneController from '../controllers/personne.controller.js';
// ici, on gere les routes relatives aux personnes
const router = express.Router();

// Mapping entre route et conrtoleur
router.get('/', personneController.show);
router.get('/:id', personneController.remove);
router.post('/', personneController.add);


export default router;