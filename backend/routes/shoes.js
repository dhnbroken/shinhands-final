const router = require('express').Router();
const shoesController = require('../controllers/ShoesController.js');

router.post('/', shoesController.createShoes);
router.get('/', shoesController.getAllShoes);
router.get('/:id', shoesController.getShoes);
router.put('/:id', shoesController.updateShoes);
router.delete('/:id', shoesController.deleteShoes);

module.exports = router;
