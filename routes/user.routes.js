const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")

const {
    editProfile,
    getAllUsers,
    getUserDetails,
    deleteUser,
    getUserFavorites,
    addRating
} = require("../controllers/user.controllers.js")

router.get("/getAllUsers", getAllUsers)
router.get("/getOneUser/:user_id", getUserDetails)
router.get("/Favorites/:user_id", verifyToken, getUserFavorites)
// router.post("/saveUser", saveUser)
router.delete("/deleteUser/:user_id", verifyToken, deleteUser)
router.put("/editProfile/:user_id", verifyToken, editProfile)
router.put("/addRating/:ratedUserId", verifyToken, addRating)

module.exports = router
