const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/reaction', auth, postCtrl.addReaction);
router.put('/:id/reaction', auth, postCtrl.updateReaction);
router.delete('/:id/reaction', auth, postCtrl.deleteReaction);


module.exports = router;