const { default: Axios } = require('axios')

Axios.post('http://localhost:5000/user', { username: 'aa1bf5d4', password: '986916a5' }).then((response) => {
    console.log(response.data)
})