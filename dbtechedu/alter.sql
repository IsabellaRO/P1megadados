ALTER TABLE Aulas
ADD FOREIGN KEY (idEvento)
REFERENCES Eventos(idEvento);

ALTER TABLE Aulas
ADD FOREIGN KEY (idWorkshop)
REFERENCES Workshops(idWorkshop);

ALTER TABLE AulaProf
ADD FOREIGN KEY (idProfessor)
REFERENCES Professores(CPF);

ALTER TABLE AulaAluno
ADD FOREIGN KEY (idAluno)
REFERENCES Alunos(idAluno);

ALTER TABLE Alunos
ADD FOREIGN KEY (idAula)
REFERENCES AulaAluno(idAula);

ALTER TABLE Professores
ADD FOREIGN KEY (idWorkshop)
REFERENCES Habilidades(idWorkshop);

ALTER TABLE Professores
ADD FOREIGN KEY (idAula)
REFERENCES AulaProf(idAula);

ALTER TABLE Workshops
ADD FOREIGN KEY (idProfessor)
REFERENCES Habilidades(idProfessor);