const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { addAddress } = require("../controllers/addressController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router  = express.Router();

router.post('/addAddress',authMiddleware,roleMiddleware(['user']),addAddress);

module.exports = router;