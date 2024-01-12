const PlantExchange = require("../models/PlantExchange.model")
const { verifyToken } = require('../middleware/verifyToken')
const Conversation = require("../models/Conversation.model")



const saveExchange = async (req, res, next) => {
    const { giver, receiver, givenPost } = req.body

    try {
        const exchange = await PlantExchange.create({ giver, receiver, givenPost })
        await Conversation.findOneAndUpdate({ post: givenPost }, { exchangeStatus: 'pending' })
        res.json(exchange)
    } catch (err) {
        next(err)
    }
}

const updateExchange = async (req, res, next) => {
    const { exchange_id } = req.params;
    const { status } = req.body;

    try {
        const updatedExchange = await PlantExchange.findByIdAndUpdate(
            exchange_id,
            { status },
            { new: true }
        );

        if (updatedExchange) {
            await Conversation.findOneAndUpdate(
                { post: updatedExchange.givenPost },
                { exchangeStatus: status },
                { new: true }
            );
        }

        res.json(updatedExchange);
    } catch (err) {
        next(err);
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

