const PlantExchange = require("../models/PlantExchange.model")
const { verifyToken } = require('../middleware/verifyToken')
const Conversation = require("../models/Conversation.model")



const saveExchange = async (req, res, next) => {
    const { giver, receiver, givenPost } = req.body

    try {
        const exchange = await PlantExchange.create({ giver, receiver, givenPost })
        const updatedConversation = await Conversation.findOneAndUpdate(
            { post: givenPost },
            {
                exchangeStatus: 'pending',
                exchangeId: exchange._id
            },
            { new: true }
        )
        res.json({ exchange, updatedConversation })
    } catch (err) {
        next(err)
    }
}

const updateExchange = async (req, res, next) => {
    const { exchange_id } = req.params
    const { exchangeData } = req.body

    try {
        const updatedExchange = await PlantExchange.findByIdAndUpdate(
            exchange_id,
            { exchangeData },
            { new: true }
        )

        if (updatedExchange) {
            await Conversation.findOneAndUpdate(
                { post: updatedExchange.givenPost },
                { exchangeStatus: exchangeData },
                { new: true }
            )
        }

        res.json(updatedExchange)
    } catch (err) {
        next(err)
    }
}

const getExchangesForUserByStatus = (req, res, next) => {
    const { user_id } = req.params
    const { status } = req.params
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

