const config = require('./config.json')
const { default: Axios } = require('axios')

Axios.get(`${config.endpoint}/user`).then((response) => {
    console.log(response.data)
})