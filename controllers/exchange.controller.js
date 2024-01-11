const PlantExchange = require("../models/PlantExchange.model")
const { verifyToken } = require('../middleware/verifyToken')
const Conversation = require("../models/Conversation.model")



const saveExchange = async (req, res, next) => {
    const { giver, receiver, givenPost } = req.body

    console.log("este es el givenpost", givenPost)

    try {
        const exchange = await PlantExchange.create({ giver, receiver, givenPost })
        await Conversation.findOneAndUpdate({ post: givenPost }, { exchangeStatus: 'pending' })
        res.json(exchange)
    } catch (err) {
        next(err)
    }
}

const updateExchange = async (req, res, next) => {
    const { exchange_id } = req.params
    const { status } = req.body

    try {
        const updatedExchange = await PlantExchange.findByIdAndUpdate(exchange_id, { status }, { new: true })
        await Conversation.findOneAndUpdate({ post: updatedExchange.givenPost }, { exchangeStatus: status })
        res.json(updatedExchange)
    } catch (err) {
        next(err)
    }
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

