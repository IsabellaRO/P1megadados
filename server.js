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
    res.sendFile('views/main.html', {
        root: __dirname
    });
});

////////// CREATES
app.get("/addaluno", function (req, res) {
    // connection.query("SELECT * FROM Alunos", function (error, results, fields) {
    //     if (error) throw error;
    //     const alunos = results;
    //   console.log(Alunos)
    res.sendFile('views/addAluno.html', {
        root: __dirname
        // });
        // res.sendfile("views/index.html");
    })
})

app.post("/addaluno", function (req, res) {
    var novo_aluno = {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        projeto: req.body.projeto,
        colégio: req.body.colégio
    };
    console.log(novo_aluno)

    connection.query("INSERT INTO Alunos SET ?", novo_aluno, function (error, results, fields) {
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
    });
    res.redirect('/listaprofessores');
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


app.get("/listalunosimpac", function (req, res) {
    let CPF = req.query.CPF;
    connection.query(`SELECT DISTINCT AulaAluno.idAluno FROM
    AulaAluno    INNER JOIN Professores ON AulaAluno.idAula = Professores.idAula
                 INNER JOIN Alunos ON AulaAluno.idAula = Alunos.idAula
                 WHERE Professores.CPF = ?`, CPF, function (error, results, fields) {
        if (error) throw error;
        // console.log(results);

        id = [];
        for (var i = 0; i < results.length; i++) {
            id.push(results[i].idAluno);
        }
        console.log(id);

        connection.query('SELECT * FROM Alunos WHERE idAluno IN (?)', [id], function (error, results, fields) {


            var alunos = [];
            var nascimento = [];
            var projeto = [];
            var colégio = [];
            var idAula = [];

            for (var i = 0; i < results.length; i++) {
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
})



app.get("/listaprofessores", function (req, res) {
    //Getting key
    // let key = req.query.key;
    connection.query("SELECT * FROM Professores", function (error, results, fields) {
        if (error) throw error;

        var CPF = [];
        var nome = [];
        var rg = [];
        var orgao = [];
        var curso = [];
        var semestre = [];
        var idWorkshop = [];
        var idAula = [];
        var avaliacao = [];

        for (var i = 0; i < results.length; i++) {
            CPF.push(results[i].CPF);
            nome.push(results[i].nome);
            rg.push(results[i].rg);
            orgao.push(results[i].orgao);
            curso.push(results[i].curso);
            semestre.push(results[i].semestre);
            idWorkshop.push(results[i].idWorkshop);
            idAula.push(results[i].idAula);
            avaliacao.push(results[i].avaliacao);
        }
        //   if (error) throw error;
        //   const professores = results;
        //   res.json(results)
        // })
        // connection.query(`SELECT * FROM Professores WHERE avaliacao > ${parseFloat(key)}`, function (error, results, fields) {
        // const professores = results;
        // console.log(professores);
        // res.json(results)
        res.render('listProf', {
            CPF: CPF,
            nome: nome,
            rg: rg,
            orgao: orgao,
            curso: curso,
            semestre: semestre,
            idWorkshop: idWorkshop,
            idAula: idAula,
            avaliacao: avaliacao
        });
    })
})

app.get("/listaeventos", function (req, res) {
    connection.query("SELECT * FROM Eventos", function (error, results, fields) {
    if (error) throw error;

    var id = [];
    var nome = [];
    var endereco = [];
    var diaehora = [];
    var duracao = [];

    for (var i = 0; i < results.length; i++) {
        id.push(results[i].idEvento);
        nome.push(results[i].nome);
        endereco.push(results[i].endereco);
        var date = new Date(results[i].diaehora);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 //getMonth is zero based;
        var day = date.getDate();
        var dataehora = day + "/" + month + "/" + year;
        diaehora.push(dataehora);
        duracao.push(results[i].duracao);
    }
        console.log(id, nome, endereco, diaehora, duracao);
        res.render('listEventos', {
            id: id,
            eventos: nome,
            endereco: endereco,
            diaehora: diaehora,
            duracao: duracao
        });
    })
})

app.get("/listaworkshops", function (req, res) {
    connection.query("SELECT * FROM Workshops", function (error, results, fields) {
    if (error) throw error;

    var id = [];
    var nome = [];
    var objetivos = [];
    var duracao = [];
    console.log(id)
    for (var i = 0; i < results.length; i++) {
        id.push(results[i].idWorkshop);
        nome.push(results[i].nome);
        objetivos.push(results[i].objetivos);
        duracao.push(results[i].duracao);
    }
        console.log(id, nome, objetivos, duracao);
        res.render('listWorkshops', {
            id: id,
            workshops: nome,
            objetivos: objetivos,
            duracao: duracao
        });
    })
})

////////// UPDATE

app.get("/editaluno", function (req, res) {
    let id = req.query.id;
    // connection.query("SELECT * FROM Alunos", function (error, results, fields) {
    //     if (error) throw error;
    //     const alunos = results;
    //   console.log(Alunos)
    res.render('editAluno', {
        id: id
    });

})

app.post("/editaluno", function (req, res) {
    let id = req.query.id;
    var aluno = {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        projeto: req.body.projeto,
        colégio: req.body.colégio
    };
    // console.log(aluno)

    connection.query(`UPDATE  Alunos SET ? WHERE idAluno = ?`, [aluno, id], function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listalunos');
})


app.get("/editprof", function (req, res) {
    let id = req.query.id;
    // connection.query("SELECT * FROM Alunos", function (error, results, fields) {
    //     if (error) throw error;
    //     const alunos = results;
    //   console.log(Alunos)
    res.render('editProfessor', {
        id: id
    });

})

app.post("/editprof", function (req, res) {
    let idpr = req.query.id;
    var professor = {
        nome: req.body.nome,
        rg: req.body.rg,
        orgao: req.body.orgao,
        curso: req.body.curso,
        semestre: req.body.semestre,
        avaliacao: req.body.avaliacao
    };
    console.log(professor)

    connection.query(`UPDATE Professores SET ? WHERE CPF = ?`, [professor, idpr], function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listaprofessores');
})

////////// DELETE
app.get("/delaluno", function (req, res) {
    let idal = req.query.idal;
    console.log(idal)

    connection.query("DELETE FROM Alunos WHERE idAluno = ?", idal, function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listalunos');
})

app.get("/delprof", function (req, res) {
    let CPF = req.query.CPF;
    console.log(CPF)

    connection.query("DELETE FROM Professores WHERE CPF = ?", CPF, function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listaprofessores');
})

app.get("/delevento", function (req, res) {
    let idev = req.query.idev;
    console.log(idev)

    connection.query("DELETE FROM Eventos WHERE idEvento = ?", idev, function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listaeventos');
})

app.get("/delwork", function (req, res) {
    let idwo = req.query.idwo;
    console.log(idwo)

    connection.query("DELETE FROM Workshops WHERE idWorkshop = ?", idwo, function (error, results, fields) {
        if (error) throw error;
    });
    res.redirect('/listaworkshops');
})

app.listen(port, function () {
    console.log('listening on port:', port)
})