const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.set('view engine', 'ejs');
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

app.get('/', function (req, res) {
    res.sendFile('views/main.html' , { root : __dirname});
 });

//CREATES
app.get("/addaluno", function (req, res) {
    connection.query("SELECT * FROM Alunos", function (error, results, fields) {
        if (error) throw error;
        const alunos = results;
        //   console.log(Alunos)
        res.sendFile('views/addAluno.html', {
            root: __dirname
        });
        // res.sendfile("views/index.html");
    })
})

app.post("/addaluno", function (req, res) {
    var novo_aluno = {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        projeto: req.body.projeto,
        colégio: req.body.colegio
    };
    console.log(novo_aluno)
    
    connection.query("INSERT INTO Alunos SET ?",     novo_aluno, function (error, results, fields) {   
        if (error) throw error;
        //res.redirect('listaalunos');
    });
})

app.get("/addprofessor", function (req, res) {
    connection.query("SELECT * FROM Professores", function (error, results, fields) {
        if (error) throw error;
        const professores = results;
        //   console.log(Alunos)
        res.sendFile('views/addProfessor.html', {
            root: __dirname
        });
        // res.sendfile("views/index.html");
    })
})

app.post("/addprofessor", function (req, res) {
    var nome = req.body.nome;
    var CPF = req.body.CPF;
    var rg = req.body.rg;
    var orgao = req.body.orgao;
    var curso = req.body.curso;
    var semestre = req.body.semestre;
    var avaliacao = req.body.avaliacao;
    console.log(nome, CPF, rg, orgao, curso, semestre, avaliacao)
    res.redirect('listaprofessores');
})

app.get("/addevento", function (req, res) {
        connection.query("SELECT * FROM Eventos", function (error, results, fields) {
        if (error) throw error;
        const eventos = results;
        //   console.log(Alunos)
        res.sendFile('views/addEvento.html', {
            root: __dirname
        });
        // res.sendfile("views/index.html");
    })
})

app.post("/addevento", function (req, res) {
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var diaehora = req.body.diaehora;
    var duracao = req.body.duracao;
    console.log(nome, endereco, diaehora, duracao)
    res.redirect('listaeventos');
})


app.get("/addworkshop", function (req, res) {
    connection.query("SELECT * FROM Workshops", function (error, results, fields) {
        if (error) throw error;
        const workshops = results;
        //   console.log(Alunos)
        res.sendFile('views/addWorkshop.html', {
            root: __dirname
        });
        // res.sendfile("views/index.html");
    })
})

app.post("/addworkshop", function (req, res) {
    var nome = req.body.nome;
    var objetivos = req.body.objetivos;
    var duracao = req.body.duracao;
    console.log(nome, objetivos, duracao)
    res.redirect('listaworkshops');
})

///////////////////////  GET


app.get("/listalunos", function (req, res) {
    connection.query("SELECT * FROM Alunos", function (error, results, fields) {
        if (error) throw error;
        const alunos = results;
          console.log(alunos)
        res.render('listAlunos', {alunos});

    })
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