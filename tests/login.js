const { default: Axios } = require('axios')

Axios.post('http://localhost:5000/user', { username: '12345678', password: 'ABCDEF12' }).then((response) => {
    console.log(response.data)
})