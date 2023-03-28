const router = require('express').Router();
const shoesController = require('../controllers/ShoesController.js');
const { verifyTokenAndAdmin } = require('../controllers/verifyToken.js');

router.post('/', verifyTokenAndAdmin, shoesController.createShoes);
router.get('/', shoesController.getAllShoes);
router.get('/:id', shoesController.getShoes);
router.put('/:id', verifyTokenAndAdmin, shoesController.updateShoes);
router.delete('/:id', shoesController.deleteShoes);

module.exports = router;
