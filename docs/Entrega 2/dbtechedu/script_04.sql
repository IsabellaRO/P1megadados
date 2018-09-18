USE dbtechedu;
DROP TABLE IF EXISTS AulaAluno;
CREATE TABLE AulaAluno (
    idAula INT,
    idAluno INT,
    PRIMARY KEY (idAula, idAluno),
    FOREIGN KEY (idAula)
		REFERENCES Aulas(idAula)
);

DROP TABLE IF EXISTS Alunos;
CREATE TABLE Alunos (
	idAluno INT auto_increment,
    nome VARCHAR(80) NOT NULL,
    nascimento DATE,
    projeto VARCHAR(80),
    colégio VARCHAR(80),
    idAula INT,
    PRIMARY KEY (idAluno), 
    FOREIGN KEY (idAula)
		REFERENCES AulaAluno(idAula)
);

ALTER TABLE AulaAluno
ADD FOREIGN KEY (idAluno)
REFERENCES Alunos(idAluno);