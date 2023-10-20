const PlantExchange = require("../models/PlantExchange.model");
const { verifyToken } = require('../middleware/verifyToken')



const saveExchange = (req, res, next) => {
    // aqui me tendré que traer los datos de alguna manera
    const { giver, receiver, givenPost } = req.body

    console.log("esto es lo que me llega al controller por req.body", req.body)

    PlantExchange
        .create({ giver, receiver, givenPost })
        .then(exchange => {
            res.json(exchange);
        })
        .catch(err => {
            next(err);
        })
}

const updateExchange = (req, res, next) => {
    const { exchange_id } = req.params
    const { status } = req.body

    PlantExchange
        .findByIdAndUpdate(exchange_id, { status: status }, { new: true })  // { new: true } returns the updated document
        .then(updatedExchange => {
            res.json(updatedExchange);
        })
        .catch(err => {
            next(err);
        })

}

const getPendingExchangesForUser = (req, res, next) => {
    const { user_id } = req.params;

    // Assuming 'pending' is the status for exchanges that haven't been accepted/rejected
    PlantExchange
        .find({
            $or: [{ giver: user_id }, { receiver: user_id }],
            status: 'pending'
        })
        .populate('giver receiver givenPost') // Optionally populate fields for more details
        .then(pendingExchanges => {
            res.json(pendingExchanges);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    saveExchange,
    updateExchange,
    getPendingExchangesForUser
}

