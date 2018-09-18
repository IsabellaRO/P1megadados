USE dbtechedu;
DROP TABLE IF EXISTS Habilidades;
CREATE TABLE Habilidades (
    idWorkshop INT,
    idProfessor INT,
    PRIMARY KEY (idWorkshop, idProfessor),
    FOREIGN KEY (idWorkshop)
		REFERENCES Workshops(idWorkshop),
	FOREIGN KEY (idProfessor)
		REFERENCES Professores(CPF)
);

ALTER TABLE Professores
ADD FOREIGN KEY (idWorkshop)
REFERENCES Habilidades(idWorkshop);

ALTER TABLE Workshops
ADD FOREIGN KEY (idProfessor)
REFERENCES Habilidades(idProfessor);