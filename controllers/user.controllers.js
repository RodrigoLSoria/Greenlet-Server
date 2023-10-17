const User = require("../models/User.model")

const getAllUsers = (req, res, next) => {
    User
        .find()
        .sort({ usernmae: -1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneUser = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

//no estoy haciendo el de save porque si con el auth ya se crean usuarios no tiene sentido repetir el save no??

const deleteUser = (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editProfile = (req, res, next) => {
    const { user_id } = req.params
    const userData = req.body

    User
        .findByIdAndUpdate(user_id, userData)
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    editProfile
}