const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")

const {
    saveExchange,
    updateExchange,
    getPendingExchangesForUser
} = require("../controllers/exchange.controller")


router.post("/saveExchange", verifyToken, saveExchange)
router.put("/updateExchange/:exchange_id", verifyToken, updateExchange)
router.get("/pendingExchanges/:user_id", verifyToken, getPendingExchangesForUser)

module.exports = router;
