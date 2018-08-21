const router = require('express').Router();
const usersController = require('../controllers/users.controller')();

module.exports = router;

// api routes ==============================================
router.get('/', usersController.getAll);
router.post('/', usersController.register);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);
