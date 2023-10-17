const Post = require("../models/Post.model")
const geocodingService = require('../services/geocode.services')


const getAllPosts = (req, res, next) => {


    Post
        .find()
        .sort({ createdAt: -1 })
        .select({ title: 1, description: 1, image: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err));
}

const getPostsByLocation = (req, res, next) => {
    const { city } = req.params

    Post
        .find({ 'location.city': city })
        .then((posts) => {
            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No posts found in the specified city.' });
            }
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        });

}

const getPostsByOwner = (req, res, next) => {
    const { owner_id } = req.params;
    Post
        .find({ owner: owner_id })
        .sort({ createdAt: -1 })
        .then(response => res.json(response))
        .catch(err => next(err));
}

const getOnePost = (req, res, next) => {
    const { post_id } = req.params;
    Post
        .findById(post_id)
        .then(response => res.json(response))
        .catch(err => next(err));
}

const savePost = (req, res, next) => {

    const { title, description, plantType, image, location, category } = req.body;
    const { _id: owner } = req.payload


    console.log("req.body", req.body)


    geocodingService
        .reverseGeocode(location.coordinates[1], location.coordinates[0])
        .then(detailedLocation => {
            const fullLocation = { ...location, ...detailedLocation };
            return Post
                .create({ title, description, plantType, image, location: fullLocation, owner, category });
        })
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            next(err);
        });
}

const editPost = (req, res, next) => {
    const { post_id } = req.params;
    const formData = req.body;
    Post
        .findByIdAndUpdate(post_id, formData)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

const deletePost = (req, res, next) => {
    const { post_id } = req.params;
    Post
        .findByIdAndDelete(post_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

const getFilteredPosts = (req, res, next) => {
    const { searchQuery, category, plantType, userLatitude, userLongitude } = req.query
    const defaultMaxDistance = 20

    console.log("this is what i get in my controller", req.query)

    let query = {}

    searchQuery && (query.title = { $regex: new RegExp(searchQuery, 'i') })
    category && (query.category = category)
    plantType && (query.plantType = plantType)


    query.location = {
        $near: {
            $geometry: {
                type: 'Point',
                coordinates: [parseFloat(userLongitude), parseFloat(userLatitude)],
            },
            $maxDistance: defaultMaxDistance * 1000,
        },
    }

    Post
        .find(query)
        .populate('owner', 'username')
        .then(response => {
            res.json(response)
        })
        .catch(err => console.log(err))

}

module.exports = {
    getAllPosts,
    getOnePost,
    getPostsByOwner,
    savePost,
    editPost,
    deletePost,
    getFilteredPosts,
    getPostsByLocation
};
