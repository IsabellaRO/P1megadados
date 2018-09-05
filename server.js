const request = require('request');

request('http://localhost:3000', function(error, response, body){
    if(error) console.log(error);
    else console.log(body);
});