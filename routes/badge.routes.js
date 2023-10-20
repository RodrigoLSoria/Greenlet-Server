const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")

const {
    updateExchangeCount,
    addBadgeToUser
} = require("../controllers/badge.controller")


router.put("/updateExchangeCount/:user_id", verifyToken, updateExchangeCount)
router.post("/addBadgeToUser/:user_id", verifyToken, addBadgeToUser)
module.exports = router;
