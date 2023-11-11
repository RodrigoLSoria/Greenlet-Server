const Badge = require("../models/Badge.model")
const User = require("../models/User.model")

const getAllBadges = (req, res, next) => {
    Badge
        .find({})
        .then(badges => {
            res.json(badges);
        })
        .catch(err => next(err));
}

const updateExchangeCount = (req, res, next) => {
    const { user_id, plantType, count } = req.body
    console.log("esto es lo que me llega por reqbody", req.body)

    User
        .findById(user_id)
        .then(user => {
            const exchange = user.exchanges.find(e => e.plantType === plantType)

            if (exchange) {
                exchange.count += count
            } else {
                user.exchanges.push({ plantType, count })
            }

            return user.save()
        })
        .then(user => {
            evaluateBadges(user, res, next)
        })
        .catch(err => next(err))
}

const evaluateBadges = (user, res, next) => {
    const totalExchanges = user.exchanges.reduce((acc, exchange) => acc + exchange.count, 0)

    Badge.find({})
        .then(badges => {
            badges.forEach(badge => {
                switch (badge.criteria.type) {
                    case 'totalExchanges':
                        if (totalExchanges >= badge.criteria.value && !user.badges.includes(badge._id)) {
                            user.badges.push(badge._id)
                        }
                        break
                    case 'specificPlant':
                        const plantExchange = user.exchanges.find(ex => ex.plantType === badge.criteria.plantType)
                        if (plantExchange && plantExchange.count >= badge.criteria.value && !user.badges.includes(badge._id)) {
                            user.badges.push(badge._id)
                        }
                        break
                    default:
                        break
                }
            })

            return user.save()
        })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => next(err))
}

const addBadgeToUser = (req, res, next) => {
    const { user_id, badge_id } = req.body;

    User.findById(user_id)
        .then(user => {
            if (!user.badges.includes(badge_id)) {
                user.badges.push(badge_id);
                return user.save();
            }
            return user
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err));
}

module.exports = {
    updateExchangeCount,
    addBadgeToUser,
    getAllBadges
}


// Optimization: When you evaluate badges, you fetch all badges with Badge.find({}).
// If you have a lot of badges, this could become inefficient.Instead,
// consider fetching only the relevant badges that a user might qualify for based on their actions.