const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")

const {
    getAllBadges,
    updateExchangeCount,
    addBadgeToUser
} = require("../controllers/badge.controller")

router.get('/getAllBadges', getAllBadges)
router.put("/updateExchangeCount/:user_id", verifyToken, updateExchangeCount)
router.post("/addBadgeToUser/:user_id", verifyToken, addBadgeToUser)
module.exports = router
