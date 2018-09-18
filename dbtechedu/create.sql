DROP DATABASE IF EXISTS dbtechedu;
CREATE DATABASE dbtechedu;
USE dbtechedu;

DROP TABLE IF EXISTS Eventos;
CREATE TABLE Eventos (
    idEvento INT AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    endereco VARCHAR(80),
    diaehora DATETIME,
    duracao TIME,
    PRIMARY KEY (idEvento)
);

DROP TABLE IF EXISTS Workshops;
CREATE TABLE Workshops (
	idWorkshop INT AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    objetivos LONGTEXT,
    idProfessor BIGINT,
    idAluno INT,
    duracao TIME,
    PRIMARY KEY (idWorkshop)
);

DROP TABLE IF EXISTS Professores;
CREATE TABLE Professores (
	CPF BIGINT UNIQUE,
    nome VARCHAR(80) NOT NULL,
    rg INT,
	orgao VARCHAR(10),
    curso VARCHAR(80),
    semestre INT,
    idWorkshop INT,
    idAula INT,
    avaliacao FLOAT,
    PRIMARY KEY (CPF)
);

DROP TABLE IF EXISTS Alunos;
CREATE TABLE Alunos (
	idAluno INT AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    nascimento DATE,
    projeto VARCHAR(80),
    colegio VARCHAR(80),
    idAula INT,
    PRIMARY KEY (idAluno)
);

DROP TABLE IF EXISTS Aulas;
CREATE TABLE Aulas (
	idAula INT AUTO_INCREMENT,
    idEvento INT,
    idWorkshop INT,
    idAulaProf INT,
    idAulaAluno INT,
    duracao TIME,
    horario DATETIME,
    PRIMARY KEY (idAula, idEvento, idWorkshop)
);

DROP TABLE IF EXISTS AulaProf;
CREATE TABLE AulaProf (
    idAula INT,
    idProfessor BIGINT,
    PRIMARY KEY (idAula, idProfessor),
    FOREIGN KEY (idAula)
		REFERENCES Aulas(idAula)
);

DROP TABLE IF EXISTS AulaAluno;
CREATE TABLE AulaAluno (
    idAula INT,
    idAluno INT,
    PRIMARY KEY (idAula, idAluno),
    FOREIGN KEY (idAula)
		REFERENCES Aulas(idAula)
);

DROP TABLE IF EXISTS Habilidades;
CREATE TABLE Habilidades (
    idWorkshop INT,
    idProfessor BIGINT,
    PRIMARY KEY (idWorkshop, idProfessor),
    FOREIGN KEY (idWorkshop)
		REFERENCES Workshops(idWorkshop),
	FOREIGN KEY (idProfessor)
		REFERENCES Professores(CPF)
);