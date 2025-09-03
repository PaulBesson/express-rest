import express from 'express'
import PersonneController from '../controllers/personne.controller.js'
// ici, on gère les routes relatives  aux personnes
const router = express.Router()

// Mapping entre route et contrôleur

router.get('/', PersonneController.showAll)
router.get('/:id', PersonneController.showOne)
router.post('/', PersonneController.add)
router.delete('/:id', PersonneController.remove)
// router.put('/:id', PersonneController.update)

export default router

