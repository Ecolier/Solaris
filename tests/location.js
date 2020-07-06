const { default: Axios } = require('axios')

Axios.get('http://localhost:5000/user/location', { 
    username: 'aa1bf5d4', password: '986916a5',
    latitude: 45, longitude: 1 
}).then((response) => {
    console.log(response)
})