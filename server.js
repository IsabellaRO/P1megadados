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

////////// CREATES
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
    });
    res.redirect('/listalunos');
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
    var novo_professor = {
        nome: req.body.nome,
        CPF: req.body.CPF,
        rg: req.body.rg,
        orgao: req.body.orgao,
        curso: req.body.curso,
        semestre: req.body.semestre,
        avaliacao: req.body.avaliacao
    };
    console.log(novo_professor)
    
    connection.query("INSERT INTO Professores SET ?", novo_professor, function (error, results, fields) {   
        if (error) throw error;
        //res.redirect('listprofessores');
    });
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
    var novo_evento = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    diaehora: req.body.diaehora,
    duracao: req.body.duracao
    };
    console.log(novo_evento)
    
    connection.query("INSERT INTO Eventos SET ?", novo_evento, function (error, results, fields) {   
        if (error) throw error;
        //res.redirect('listeventos');
    });
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
    var novo_workshop = {
    nome: req.body.nome,
    objetivos: req.body.objetivos,
    duracao: req.body.duracao
    };
    console.log(novo_workshop)
    
    connection.query("INSERT INTO Workshops SET ?", novo_workshop, function (error, results, fields) {
    //res.redirect('listworkshops');
    });
})

//////////////  GET
app.get("/listalunos", function (req, res) {
    connection.query("SELECT * FROM Alunos", function (error, results, fields) {
        if (error) throw error;

        var id = [];
        var alunos = [];
        var nascimento = [];
        var projeto = [];
        var colégio = [];
        var idAula = [];

        for (var i = 0; i < results.length; i++) {
            id.push(results[i].idAluno);
            alunos.push(results[i].nome);
            var date = new Date(results[i].nascimento);
            var year = date.getFullYear();
            var month = date.getMonth() + 1 //getMonth is zero based;
            var day = date.getDate();
            var nascformat = day + "/" + month + "/" + year;
            nascimento.push(nascformat);
            projeto.push(results[i].projeto);
            colégio.push(results[i].colégio);
            idAula.push(results[i].idAula);
        }
        console.log(alunos, nascimento, projeto, colégio);
        res.render('listAlunos', {
            id: id,
            alunos: alunos,
            nascimento: nascimento,
            projeto: projeto,
            colégio: colégio
        });

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

//////// UPDATE

app.listen(port, function () {
    console.log('listening on port:', port)
})