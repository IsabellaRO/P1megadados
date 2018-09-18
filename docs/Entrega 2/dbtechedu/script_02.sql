USE dbtechedu;

DROP TABLE IF EXISTS Eventos;
CREATE TABLE Eventos (
    idEvento INT AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    endereco VARCHAR(80),
    diaehora TIMESTAMP,
    duracao TIME,
    PRIMARY KEY (idEvento)
);

DROP TABLE IF EXISTS Workshops;
CREATE TABLE Workshops (
	idWorkshop INT AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    objetivos LONGTEXT,
    idProfessor INT,
    idAluno INT,
    duracao INT,
    PRIMARY KEY (idWorkshop)
);

DROP TABLE IF EXISTS Aulas;
CREATE TABLE Aulas (
	idAula INT,
    idEvento INT,
    idWorkshop INT,
    idAulaProf INT,
    idAulaAluno INT,
    duracao TIME,
    horario TIME,
    PRIMARY KEY (idAula, idEvento, idWorkshop)
);


ALTER TABLE Aulas
ADD FOREIGN KEY (idEvento)
REFERENCES Eventos(idEvento);

ALTER TABLE Aulas
ADD FOREIGN KEY (idWorkshop)
REFERENCES Workshops(idWorkshop);

ALTER TABLE Eventos
ADD FOREIGN KEY (idWorkshop)
REFERENCES Aulas(idWorkshop);

ALTER TABLE Workshops
ADD FOREIGN KEY (idEvento)
REFERENCES Aulas(idEvento);