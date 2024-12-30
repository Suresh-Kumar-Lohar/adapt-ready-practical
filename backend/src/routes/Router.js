const express = require('express');
const router = express.Router();

// const UserRoutes = require('./UserRoutes');
const ScriptRoutes = require('./ScriptRoutes');
const FoodRoutes = require('./FoodRoutes');

// router.use('/user', UserRoutes);
router.use('/script', ScriptRoutes);
router.use('/food', FoodRoutes);

module.exports = router;