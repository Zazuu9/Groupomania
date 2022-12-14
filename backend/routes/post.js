const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/createpost", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/like/:id", auth, postCtrl.likePost);

module.exports = router;
