const router = require('express').Router();
const authController = require('../controllers/auth.controller')();

// api routes ==============================================
module.exports = router;
router.post('/register', authController.register);