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

const getUserFavorites = (req, res, next) => {
    const { user_id } = req.params;

    User
        .findById(user_id)
        .select('favorites')
        .populate('favorites')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user.favorites);
        })
        .catch(err => next(err));
};


module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    editProfile,
    getUserFavorites
}