const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/reverse-geocode', (req, res) => {
    const { latitude, longitude } = req.body
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
        .then(response => {
            const address = response.data.results[0]

            let city, country, postalCode

            for (let i = 0; i < address?.address_components.length; i++) {
                let component = address?.address_components[i]
                if (component.types.includes("locality")) {
                    city = component.long_name
                } else if (component.types.includes("country")) {
                    country = component.long_name
                } else if (component.types.includes("postal_code")) {
                    postalCode = component.long_name;
                }
            }

            res.json({
                city,
                country,
                postalCode
            });

        })
        .catch(err => {
            console.error("There was an error with reverse geocoding: ", err)
            res.status(500).json({ error: "Reverse geocoding failed" })
        })
})


module.exports = router;
