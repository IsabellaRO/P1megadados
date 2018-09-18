const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const router = express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rangobom971025",
    database: "dbtechedu"
})


app.get("/addaluno", function (req, res) {
    connection.query("SELECT * FROM Alunos", function (error, results, fields) {
        if (error) throw error;
        const alunos = results;
        //   console.log(Alunos)
        res.sendFile('views/addAluno.html' , { root : __dirname});
       // res.sendfile("views/index.html");
    })
})

app.post("/addaluno", function (req, res) {
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var projeto = req.body.projeto;
    var colegio = req.body.colegio;
    console.log(nome, nascimento, projeto, colegio)
    // connection.query("SELECT * FROM Alunos", function (error, results, fields) {
        // if (error) throw error;
        // const alunos = results;
        //   console.log(Alunos)
        // res.sendFile('views/index.html', {
            // root: __dirname
        // });
        // res.sendfile("views/index.html");
    // })
})

app.get("/eventos", function (req, res) {
    connection.query("SELECT * FROM Eventos", function (error, results, fields) {
        if (error) throw error;
        const eventos = results;
        // console.log(eventos[0]['diaehora']);
        let ano = eventos[0]['diaehora'];
        console.log(ano.getFullYear());
        res.json(results)
        //let x = new Date(2004-05-02T03:00:00.000Z);
    })
})

app.get("/professores", function (req, res) {
    //Getting key
    let key = req.query.key;

    // connection.query("SELECT * FROM Professores", function (error, results, fields) {
    //   if (error) throw error;
    //   const professores = results;
    //   res.json(results)
    // })

    connection.query(`SELECT * FROM Professores WHERE avaliacao > ${parseFloat(key)}`, function (error, results, fields) {
        if (error) throw error;
        const professores = results;
        console.log(professores);
        res.json(results)
    })
})

app.get("/aulas", function (req, res) {
    connection.query("SELECT * FROM Aulas", function (error, results, fields) {
        if (error) throw error;
        const professores = results;
        res.json(results)
    })
})

app.get("/workshops", function (req, res) {
    connection.query("SELECT * FROM Workshops", function (error, results, fields) {
        if (error) throw error;
        const professores = results;
        res.json(results)
    })
})

// app.get('/', function (req, res) {
//     res.json({ a: 1 });
// });

app.listen(port, function () {
    console.log('listening on port:', port)
})