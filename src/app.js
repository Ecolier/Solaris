const express = require('express')

const application = express()

application.use(express.json())

application.use('/user', require('./api/authentication'))

module.exports = application