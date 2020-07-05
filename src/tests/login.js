const { default: Axios } = require('axios')

Axios.post('http://localhost:5000/user', { username: '123456', password: 'ABCDEF' }).then((response) => {
    console.log(response)
})