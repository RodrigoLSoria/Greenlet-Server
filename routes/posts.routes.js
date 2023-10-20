const router = require("express").Router()

const {
    getAllPosts,
    getOnePost,
    getPostsByOwner,
    savePost,
    editPost,
    deletePost,
    getFilteredPosts,
    getPostsByLocation,
    favoritePost,
    unfavoritePost,
    closePost
} = require('../controllers/post.controller')

const { verifyToken } = require("../middleware/verifyToken")


router.get('/getAllPosts', getAllPosts);
router.get('/getOnePost/:post_id', getOnePost);
router.post('/savePost', verifyToken, savePost);
router.get('/getPostsByOwner/:owner_id', getPostsByOwner);
router.put('/editPost/:post_id', verifyToken, editPost);
router.delete('/deletePost/:post_id', verifyToken, deletePost);
router.get("/getFilteredPosts", getFilteredPosts)
router.get('/getPostsByLocation/:city', getPostsByLocation)
router.post("/favouritePost/:post_id", verifyToken, favoritePost)
router.post("/unfavouritePost/:post_id", verifyToken, unfavoritePost)
router.put("/closePost/:post_id", verifyToken, closePost)

module.exports = router;
