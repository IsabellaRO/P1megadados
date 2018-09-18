USE dbtechedu;
DROP TABLE IF EXISTS AulaProf;
CREATE TABLE AulaProf (
    idAula INT,
    idProfessor INT,
    PRIMARY KEY (idAula, idProfessor),
    FOREIGN KEY (idAula)
		REFERENCES Aulas(idAula)
);

DROP TABLE IF EXISTS Professores;
CREATE TABLE Professores (
	CPF INT UNIQUE,
    nome VARCHAR(80) NOT NULL,
    rg INT,
	orgao VARCHAR(10),
    curso VARCHAR(80),
    semestre INT,
    idWorkshop INT,
    idAula INT,
    avaliacao FLOAT,
    PRIMARY KEY (CPF), 
    FOREIGN KEY (idAula)
		REFERENCES AulaProf(idAula)
);

ALTER TABLE AulaProf
ADD FOREIGN KEY (idProfessor)
REFERENCES Professores(CPF);