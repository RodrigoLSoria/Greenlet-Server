const PlantExchange = require("../models/PlantExchange.model")
const { verifyToken } = require('../middleware/verifyToken')



const saveExchange = (req, res, next) => {
    const { giver, receiver, givenPost } = req.body

    console.log("esto es lo que me llega al controller por req.body", req.body)

    PlantExchange
        .create({ giver, receiver, givenPost })
        .then(exchange => {
            res.json(exchange)
        })
        .catch(err => {
            next(err)
        })
}

const updateExchange = (req, res, next) => {
    const { exchange_id } = req.params
    const { status } = req.body

    PlantExchange
        .findByIdAndUpdate(exchange_id, { status: status }, { new: true })
        .then(updatedExchange => {
            res.json(updatedExchange)
        })
        .catch(err => {
            next(err)
        })

}

const getExchangesForUserByStatus = (req, res, next) => {
    const { user_id } = req.params
    const { status } = req.params
    console.log("esto me llega a controller", req.params)
    PlantExchange
        .find({
            $or: [{ giver: user_id }, { receiver: user_id }],
            status: status
        })
        .populate('giver receiver givenPost')
        .then(pendingExchanges => {
            res.json(pendingExchanges)
        })
        .catch(err => {
            next(err)
        })
}


module.exports = {
    saveExchange,
    updateExchange,
    getExchangesForUserByStatus
}

