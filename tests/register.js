const { default: Axios } = require('axios')

Axios.get('http://localhost:5000/user').then((response) => {
    console.log(response.data)
})