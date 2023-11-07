const router = require("express").Router()

const {
    getOneAlert,
    getAlertsByOwner,
    saveAlert,
    editAlert,
    deleteAlert,
    checkForAlertMatches
} = require('../controllers/alert.controller')

const { verifyToken } = require("../middleware/verifyToken")


router.get('/getOneAlert/:post_id', getOneAlert);
router.post('/saveAlert', verifyToken, saveAlert);
router.get('/getAlertsByOwner/:owner_id', getAlertsByOwner);
router.put('/editAlert/:post_id', verifyToken, editAlert);
router.delete('/deleteAlert/:post_id', verifyToken, deleteAlert)
router.get('/getAlertMatches', checkForAlertMatches)

module.exports = router;
