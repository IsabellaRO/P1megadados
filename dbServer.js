var express = require('express')


var app = express()


app.get('/', function (req, res) {
    res.json({ a: 1 });
    });


app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!')
})