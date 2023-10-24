const mongoose = require('mongoose')
require('dotenv').config()
const Badge = require('./models/Badge.model')


const badges = [
    {
        name: "Green Thumbs Up",
        description: "Successfully completed the first exchange.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangesCompleted",
            count: 1
        }
    },
    {
        name: "Garden Guru",
        description: "Completed 10 exchanges.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangesCompleted",
            count: 10
        }
    },
    {
        name: "Plant Pioneer",
        description: "One of the first 100 users of the app.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "earlyAdopter",
            count: 100
        }
    },
    {
        name: "Five-Star Flora",
        description: "Received 5 positive reviews from plant exchanges.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "positiveReviews",
            count: 5
        }
    },
    {
        name: "Trusty Trader",
        description: "Completed 20 exchanges without any negative feedback.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangesWithoutNegativeFeedback",
            count: 20
        }
    },
    {
        name: "Friendly Frond",
        description: "Referred 3 friends to the app.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "referrals",
            count: 3
        }
    },
    {
        name: "Eco Exchanger",
        description: "Used sustainable packaging for 5 exchanges.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "sustainablePackaging",
            count: 5
        }
    },
    {
        name: "Milestone Master",
        description: "Exchanged a total of 50 plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangesCompleted",
            count: 50
        }
    },
    {
        name: "Local Legend",
        description: "Exchanged with 10 different users within your local community.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangesCompleted",
            count: 20
        }
    },
    {
        name: "Exchange Explorer",
        description: "Exchanged one plant from each category.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "exchangedFromEachCategory",
        }
    },
    {
        name: "Rose Romantic",
        description: "Exchanged 5 roses.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Roses"
        }
    },
    {
        name: "Cactus Captain",
        description: "Exchanged 4 different cacti.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Cacti"
        }
    },
    {
        name: "Palm Pioneer",
        description: "Successfully exchanged 3 palms.",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Palms"
        }
    },
    {
        name: "Fern Fan",
        description: "Exchanged 4 types of ferns.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Ferns"
        }
    },
    {
        name: "Orchid Overlord",
        description: "Successfully exchanged 3 types of orchids.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Orchids"
        }
    },
    {
        name: "Bamboo Baron",
        description: "Exchanged 3 bamboos.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Bamboo"
        }
    },
    {
        name: "Violet Virtuoso",
        description: "Traded 5 violets.",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Violets"
        }
    },
    {
        name: "Lily Lover",
        description: "Exchanged 4 lilies.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Lilies"
        }
    },
    {
        name: "Daisy Darling",
        description: "Swapped 5 daisies.",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Daisies"
        }
    },
    {
        name: "Sunflower Star",
        description: "Exchanged 6 sunflowers.",
        criteria: {
            type: "specificPlantExchanged",
            count: 6,
            plantType: "Sunflowers"
        }
    },
    {
        name: "Tulip Trendsetter",
        description: "Exchanged 5 tulips.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Tulips"
        }
    },
    {
        name: "Bonsai Boss",
        description: "Exchanged 3 bonsais.",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Bonsais"
        }
    },
    {
        name: "Fruitful Farmer",
        description: "Traded 3 fruit trees.",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Fruit Trees"
        }
    },
    {
        name: "Ivy Icon",
        description: "Exchanged 5 ivies.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Ivies"
        }
    },
    {
        name: "Succulent Sage",
        description: "Successfully traded 5 succulents.",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Succulents"
        }
    },
    {
        name: "Shade Savior",
        description: "Exchanged 4 shade plants.",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Shade Plants"
        }
    },
    {
        name: "Indoor Innovator",
        description: "Traded 5 indoor plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Indoor Plants"
        }
    },
    {
        name: "Aquatic Ace",
        description: "Successfully exchanged 4 aquatic plants.",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Aquatic Plants"
        }
    },
    {
        name: "Medicinal Master",
        description: "Exchanged 3 medicinal plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Medicinal Plants"
        }
    },
    {
        name: "Herbal Healer",
        description: "Traded 5 herbs.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Herbs"
        }
    },
    {
        name: "Ornamental Oracle",
        description: "Exchanged 3 ornamental trees.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Ornamental Trees"
        }
    },
    {
        name: "Climbing Champion",
        description: "Traded 4 climbing plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 4,
            plantType: "Climbing Plants"
        }
    },
    {
        name: "Grass Guru",
        description: "Successfully exchanged 3 types of grass.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Grass"
        }
    },
    {
        name: "Air Plant Artist",
        description: "Exchanged 5 air plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 5,
            plantType: "Air Plants"
        }
    },
    {
        name: "Carnivorous King/Queen",
        description: "Traded 3 carnivorous plants.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "specificPlantExchanged",
            count: 3,
            plantType: "Carnivorous Plants"
        }
    },
    {
        name: "Green Guardian",
        description: "Protected the environment by using sustainable packaging for 5 exchanges.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "sustainablePackagingUsed",
            count: 5
        }
    },
    {
        name: "Generous Giver",
        description: "Offered a plant as a 'gift'.",
        imageUrl: "PLACEHOLDER_URL_FOR_GREEN_THUMBS_UP",
        criteria: {
            type: "offeredPlantAsGift",
        }
    }
]

const MONGO_URI =
    process.env.MONGODB_URI

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        const dbName = x.connections[0].name;
        console.log(`Connected to Mongo through seeds! Database name: "${dbName}"`);

        // Clear existing badges
        return Badge.deleteMany();
    })
    .then(() => {
        console.log("Existing badges cleared!");

        // Insert new badges
        return Badge.insertMany(badges);
    })
    .then(() => {
        console.log("Badges inserted successfully!");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error:", err);
    })

console.log('MONGO_URI:', MONGO_URI);
