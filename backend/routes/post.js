const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/',  postCtrl.getAllPost);
router.get('/:id',  postCtrl.getOnePost);
router.post('/',  multer, postCtrl.createPost);
router.put('/:id',  postCtrl.modifyPost);
router.delete('/:id',  postCtrl.deletePost);

module.exports = router;