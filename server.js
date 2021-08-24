const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

//Connecting to the DB
mongoose.connect('mongodb://localhost:27017/bountiesDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("CONNECTED TO THE BOUNTIES DB")
)

app.use('/bounties', require('./routes/bounty'))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9004, () => {
    console.log('The server is running on a Port 9004');
})