const router = require("express").Router();
const userController = require("../Controller/userController");

router.get('/read', userController.getAllUsers);

router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;