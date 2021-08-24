const express = require('express')
const bountyRouter = express.Router()
const Bounty = require('../models/bounty')

// const bounties = [
//     {firstName: 'Han', lastName: 'Soloooooooo', living: "Dead", reward: 20000, type: 'Smuggler', imgURL: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/6/4/1433405419545/90fa370a-d9c4-451a-93ae-de3265bef916-1020x612.jpeg?width=300&quality=45&auto=format&fit=max&dpr=2&s=4929a6f3bae46b42a6cf581cf8f9bc84', _id: uuid()},
//     {firstName: 'Lando', lastName: 'Calrissian', living: "Alive", reward: 10000, type: 'Traitor', imgURL: 'https://www.denofgeek.com/wp-content/uploads/2017/12/star-wars-lando-calrissian.jpg?resize=768%2C432', _id: uuid()},
//     {firstName: 'Bo-Katan', lastName: 'Kryze', living: "Alive", reward: 80000, type: 'Bounty hunter', imgURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bo-katan_Kryze.jpg/250px-Bo-katan_Kryze.jpg', _id: uuid()},
//     {firstName: 'Jyn', lastName: 'Ersooooooo', living: "Dead", reward: 100000, type: 'Fugitive', imgURL: 'https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/wire/legacy/felicity-jones-rogue-one.jpg', _id: uuid()},
//     {firstName: 'Poe', lastName: 'Dameron', living: "Alive", reward: 500000, type: 'Fugitive', imgURL: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Poe_Dameron-Force_Awakens_%282015%29.png', _id: uuid()}
// ]

//Get all bounties
bountyRouter.get('/', (req, res, next) => {
    Bounty.find((err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

//Get one bounty
bountyRouter.get('/:bountyId', (req, res, next) => {
    Bounty.findOne({_id: req.params.itemId}, (err, foundBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundBounty)
    })
})

bountyRouter.post('/', (req, res, next) => {
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})

bountyRouter.delete('/:bountyId', (req, res, next) => {
    Bounty.findOneAndDelete({_id: req.params.bountyId}, (err, deletedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`${deletedBounty._id} has successfully been deleted`)
    })
})

bountyRouter.put('/:bountyID', (req, res, next) => {
    Bounty.findOneAndUpdate(
        { _id: req.params.bountyId },
        req.body,
        { new: true },
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
    )
})

module.exports = bountyRouter