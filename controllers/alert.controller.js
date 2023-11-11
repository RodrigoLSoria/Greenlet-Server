const Post = require("../models/Post.model")
const User = require("../models/User.model")
const Alert = require("../models/Alert.model")
const geocodingService = require('../services/geocode.services')



const getAlertsByOwner = (req, res, next) => {
    const { owner_id } = req.params;
    User
        .findById(owner_id)
        .populate('alerts')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.alerts);
        })
        .catch(err => next(err));
}

const getOneAlert = (req, res, next) => {
    const { alert_id } = req.params;
    Alert
        .findById(alert_id)
        .then(alert => {
            if (!alert) {
                return res.status(404).json({ message: 'Alert not found' });
            }
            res.json(alert);
        })
        .catch(err => next(err));
}
const saveAlert = (req, res, next) => {
    const alertData = req.body;
    const { _id: owner } = req.payload;

    Alert
        .create({ ...alertData, userId: owner })
        .then(alert => {
            return User.findByIdAndUpdate(owner, { $push: { alerts: alert._id } });
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
}

const editAlert = (req, res, next) => {
    const { alert_id } = req.params;
    const formData = req.body;
    Alert
        .findByIdAndUpdate(alert_id, formData)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

const deleteAlert = (req, res, next) => {
    const { alert_id } = req.params;
    const { _id: owner } = req.payload;

    Alert
        .findByIdAndDelete(alert_id)
        .then(alert => {
            if (!alert) {
                throw new Error('Alert not found');
            }
            return User.findByIdAndUpdate(owner, { $pull: { alerts: alert._id } });
        })
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

const checkForAlertMatches = async (req, res, next) => {
    try {
        const newPost = req.body;
        const alerts = await Alert.find({ /* Your matching criteria here */ });
        const matches = alerts.filter(alert => {

            // return alert.category === newPost.category && 

        });

        // Do something with the matches, e.g., send an email

        res.json(matches);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getOneAlert,
    getAlertsByOwner,
    saveAlert,
    editAlert,
    deleteAlert,
    checkForAlertMatches

};

