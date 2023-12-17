const axios = require('axios')


const reverseGeocode = (latitude, longitude) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
        .then(response => {
            const address = response.data.results[0]

            let city, country, postalCode

            for (let i = 0; i < address.address_components.length; i++) {
                let component = address.address_components[i]
                if (component.types.includes("locality")) {
                    city = component.long_name
                } else if (component.types.includes("country")) {
                    country = component.long_name
                } else if (component.types.includes("postal_code")) {
                    postalCode = component.long_name
                }
            }

            return {
                city,
                country,
                postalCode
            }
        })
        .catch(error => {
            console.error("There was an error with reverse geocoding: ", error)
            throw error
        })
};


module.exports = {
    reverseGeocode
}
