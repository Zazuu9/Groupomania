const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id',  userCtrl.modifyUser);
router.delete('/:id',  userCtrl.deleteUser);

module.exports = router;