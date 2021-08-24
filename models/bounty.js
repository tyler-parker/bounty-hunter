const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bountySchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }, 
    living: {
        type: String
    },
    reward: {
        type: Number
    },
    type: {
        type: String
    },
    imgURL: {
        type: String
    }
})

module.exports = mongoose.model("Bounty", bountySchema)