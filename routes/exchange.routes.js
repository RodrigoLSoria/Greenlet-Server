const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")

const {
    saveExchange,
    updateExchange,
    getExchangesForUserByStatus
} = require("../controllers/exchange.controller")


router.post("/saveExchange", verifyToken, saveExchange)
router.put("/updateExchange/:exchange_id", verifyToken, updateExchange)
router.get("/getExchangesForUserByStatus/:user_id/:status", verifyToken, getExchangesForUserByStatus)

module.exports = router
