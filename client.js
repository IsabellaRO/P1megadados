const request = require('request');
const express = require('express');
const app = express();
const port = 8080;

app.get('/listalunos', function (req, res) {
    request('http://localhost:3000/listalunos', function(error, response, body){
        if(error) console.log(error);
        else console.log(response, "\n");
        res.write(body);
    });
});

app.get('/delaluno', function (req, res) {
    let idal = req.query.idal;
    // console.log(idal)
    request(`http://localhost:3000/delaluno/?idal=${idal}`, function(error, response, body){
        if(error) console.log(error);
        else console.log(response, "\n");
        res.write(body);
    });
});

app.get('/', function (req, res) {
    request(`http://localhost:3000/`, function(error, response, body){
        if(error) console.log(error);
        else console.log(response, "\n");
        res.write(body);
    });
});

// request('http://localhost:3000/eventos', function(error, response, body){
//     if(error) console.log(error);
//     else console.log(body, "\n");
// });

// request('http://localhost:3000/professores/?key=8', function(error, response, body){
//     if(error) console.log(error);
//     else console.log(body, "\n");
// });

// request('http://localhost:3000/aulas', function(error, response, body){
//     if(error) console.log(error);
//     else console.log(body, "\n");
// });

// request('http://localhost:3000/workshops', function(error, response, body){
//     if(error) console.log(error);
//     else console.log(body, "\n");
// });

app.listen(port, function () {
    console.log('listening on port:', port)
})