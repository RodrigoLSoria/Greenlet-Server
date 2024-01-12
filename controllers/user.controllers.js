const User = require("../models/User.model")

const getAllUsers = (req, res, next) => {
    User
        .find()
        .sort({ usernmae: -1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getUserDetails = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('badges')
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
        .findByIdAndUpdate(user_id, userData, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))

}

const addRating = (req, res, next) => {
    const { ratedUserId } = req.params
    const ratingData = req.body

    console.log("esto me llega al controller,", ratedUserId, ratingData)

    User.findByIdAndUpdate(ratedUserId)
        .then(user => {
            if (!user) throw new Error('User not found')
            user.ratings.push(ratingData)
            return user.save()
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => {
            console.error('Error adding rating:', err)
            res.status(500).send('Internal server error')
        })
}

const getUserFavorites = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select('favorites')
        .populate('favorites')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(user.favorites)
        })
        .catch(err => next(err))
}


module.exports = {
    getAllUsers,
    getUserDetails,
    deleteUser,
    editProfile,
    getUserFavorites,
    addRating
}