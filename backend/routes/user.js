const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUser);
router.get('/getoneuser', auth, userCtrl.getOneUser);
router.put('/modifyuser', auth, userCtrl.modifyUser);
router.delete('/deleteuser', auth, userCtrl.deleteUser);
router.put('/changepwd', auth, userCtrl.changePsswd);

module.exports = router;