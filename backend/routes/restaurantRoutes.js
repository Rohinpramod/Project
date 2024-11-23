const express = require('express');
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createMenuItem, getAllMenuItems, getMenuItemsByRestaurantId } = require('../controllers/menuController');
const { upload } = require('../middlewares/multer');

const router = express.Router();


router.post('/', authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'), createRestaurant);
router.get('/', getRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.patch('/:restaurantId', authMiddleware, roleMiddleware(['restaurant manager']), updateRestaurant);
router.delete('/:restaurantId', authMiddleware,roleMiddleware(['admin']),deleteRestaurant);

router.post('/:restaurantId',authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'),createMenuItem);

;

module.exports = router;