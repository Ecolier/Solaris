const { default: Axios } = require('axios')

Axios.get('http://localhost:5000/user/location', { 
    username: '123456', password: 'ABCDEF',
    latitude: 45, longitude: 1 
}).then((response) => {
    console.log(response)
})