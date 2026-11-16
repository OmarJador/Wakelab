const axios = require('axios');

async function getData(){

    const resp = await axios.get("http://127.0.0.1:3000/api/activites")
    const data = resp.data
    console.log(data)

}

getData()