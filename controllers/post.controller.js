const Post = require("../models/Post.model")
const User = require("../models/User.model")
const geocodingService = require('../services/geocode.services')



const getAllPosts = (req, res, next) => {


    Post
        .find({ isClosed: false })
        .sort({ createdAt: -1 })
        .select({ title: 1, description: 1, image: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getPostsByLocation = (req, res, next) => {
    const { city } = req.params

    Post
        .find({ 'location.city': city, isClosed: false })
        .then((posts) => {
            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No posts found in the specified city.' })
            }
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ message: 'Internal server error.' })
        })

}

const getPostsByOwner = (req, res, next) => {
    const { owner_id } = req.params
    Post
        .find({ owner: owner_id })
        .populate('owner', 'username')
        .sort({ createdAt: -1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOnePost = (req, res, next) => {
    const { post_id } = req.params
    Post
        .findById(post_id)
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const savePost = async (req, res, next) => {

    const { title, description, plantType, image, location, category,
        equipmentType, condition, otherNotes } = req.body
    const { _id: owner } = req.payload

    try {
        const detailedLocation = await geocodingService.reverseGeocode(location.coordinates[1], location.coordinates[0])
        const fullLocation = { ...location, ...detailedLocation }
        const newPost = await Post.create({
            title,
            description,
            plantType,
            image,
            location: fullLocation,
            owner,
            category,
            equipment: {
                equipmentType,
                condition,
                otherNotes
            }
        })

        res.json(newPost)

        checkWishlistMatches(plantType, newPost._id)

    }
    catch (err) {
        next(err)
    }

    const checkWishlistMatches = async (plantType, postId) => {
        try {
            const userswithmatch = await User.find({ wishlist: plantType })
            userswithmatch.forEach(user => {
                console.log(`user ${user.username} has a match with post ${postId}`)
            })
        }
        catch (err) {
            next(err)
        }

    }
}

const editPost = (req, res, next) => {
    const { post_id } = req.params
    const formData = req.body
    Post
        .findByIdAndUpdate(post_id, formData)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deletePost = (req, res, next) => {
    const { post_id } = req.params
    Post
        .findByIdAndDelete(post_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const getFilteredPosts = (req, res, next) => {
    const { searchQuery, category, plantType, dateFilter, userLatitude, userLongitude, radius } = req.query
    const maxDistance = radius ? parseInt(radius) : defaultMaxDistance

    let query = { isClosed: false }

    searchQuery && (query.title = { $regex: new RegExp(searchQuery, 'i') })
    category && (query.category = category)
    plantType && (query.plantType = plantType)


    if (category === 'found') {
        query.createdAt = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    } else if (dateFilter) {
        const now = new Date()
        let startDate

        switch (dateFilter) {
            case '24h':
                startDate = new Date(now - 24 * 60 * 60 * 1000)
                break
            case '7d':
                startDate = new Date(now - 7 * 24 * 60 * 60 * 1000)
                break
            case '30d':
                startDate = new Date(now - 30 * 24 * 60 * 60 * 1000)
                break
            case 'all':
            default:
                startDate = new Date(0)
        }

        query.createdAt = { $gte: startDate }
    }

    query.location = {
        $near: {
            $geometry: {
                type: 'Point',
                coordinates: [parseFloat(userLongitude), parseFloat(userLatitude)],
            },
            $maxDistance: maxDistance,
        },

    }

    Post
        .find(query)
        .populate('owner')
        .then(response => {
            res.json(response)
        })
        .catch(err => console.log(err))

}

const favoritePost = (req, res, next) => {
    const { post_id } = req.params
    const user_id = req.payload._id

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favorites: post_id } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const unfavoritePost = (req, res, next) => {
    const { post_id } = req.params
    const user_id = req.payload._id

    User
        .findByIdAndUpdate(user_id, { $pull: { favorites: post_id } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const closePost = (req, res, next) => {
    const { post_id } = req.params

    Post
        .findByIdAndUpdate(post_id, { isClosed: true })
        .then(() => res.status(200).json({ message: 'Post closed successfully.' }))
        .catch(err => next(err))
}

module.exports = {
    getAllPosts,
    getOnePost,
    getPostsByOwner,
    savePost,
    editPost,
    deletePost,
    getFilteredPosts,
    getPostsByLocation,
    favoritePost,
    unfavoritePost,
    closePost
}

