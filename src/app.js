const express = require('express')

const application = express()

application.use(express.json())

application.use('/user', require('./api/authentication'))
application.use('/user/location', require('./api/location'))

module.exports = application