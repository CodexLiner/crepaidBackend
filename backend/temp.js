const api = async ()=>{
    const axios = require('axios');

    const options = {
      method: 'POST',
      url: 'api.freebinchecker.com/bin/52000820',
      params: {bin: '519279'},
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4307cec6f4msh5a9c02e2a22be6fp1ec5c4jsna2e1eebfd358',
        'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com'
      },
      data: {bin: '448590'}
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
api();