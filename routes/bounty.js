const express = require('express')
const bountyRouter = express.Router()
const Bounty = require('../models/bounty')

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