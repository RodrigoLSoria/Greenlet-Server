const router = require("express").Router()
const uploaderMiddleware = require("../middleware/uploader.middleware")

const {
    image,
    // images
} = require('./../controllers/upload.controller')

router.post('/image', uploaderMiddleware.single('imageData'), image)

//si te da fallo minuto 3 del video 
// router.post('/images', uploaderMiddleware.array('imagesData', 10), images)

module.exports = router

