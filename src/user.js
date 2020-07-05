const { randomBytes } = require('crypto')
 
const create = () => {
    return {
        username: randomBytes(4).toString('hex'),
        password: randomBytes(4).toString('hex')
    }
}

module.exports = { create }