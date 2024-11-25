const express = require('express');
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createMenuItem, getMenuItemsByRestaurant, updateMenuItem, deleteMenuItem, getMenuItemByName, } = require('../controllers/menuController');
const { upload } = require('../middlewares/multer');

const router = express.Router();


router.post('/', authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'), createRestaurant);
router.get('/', getRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.patch('/:restaurantId', authMiddleware, roleMiddleware(['restaurant manager']), updateRestaurant);
router.delete('/:restaurantId', authMiddleware,roleMiddleware(['admin']),deleteRestaurant);

router.post('/:restaurantId',authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'),createMenuItem);
router.get('/menu/:restaurantId',getMenuItemsByRestaurant);
router.get('/menu-by-name/:name',getMenuItemByName);
router.put('/update/:restaurantId/:id',roleMiddleware(['admin', 'restaurant manager']),updateMenuItem);
router.delete('/delete-menu/:restaurantId/:id',roleMiddleware(['admin', 'restaurant']),deleteMenuItem);




module.exports = router;