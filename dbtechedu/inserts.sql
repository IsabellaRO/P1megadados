

INSERT Eventos (nome, endereco, diaehora, duracao)
VALUES ("Recepção dos alunos do Insper", "Rua Quatá 300", "2018-09-20", "03:30:00");

INSERT Eventos (nome, endereco, diaehora, duracao)
VALUES ("Recepção dos alunos do Lourenço Castanho", "Rua Fiandeiras 300", "2018-09-20 13:30:00", "03:30:00");


INSERT Professores (cpf, nome, curso, semestre, avaliacao)
VALUES (37592303821, "Lucas", "Engenharia da Computação", 5, 7.5);

INSERT Professores (cpf, nome, curso, semestre, avaliacao)
VALUES ( *, "Isabella", "Engenharia da Computação", 6, 8.5);

INSERT Professores (cpf, nome, curso, semestre, avaliacao)
VALUES (27593203861, "Antônio", "Engenharia Civil", 7, 5.5);


INSERT Workshops (nome, objetivos, duracao)
VALUES ("Workshop de Computação em Nuvem", "Este workshop tem o objetivo de ensinar os básicos de arquitertura de sistemas em rede", "02:00:00");

INSERT Workshops (nome, objetivos, duracao)
VALUES ("Workshop de Computação Embarcada", "Este workshop tem o objetivo de ensinar os básicos de computação em sistemas embarcados",  "02:00:00");


INSERT Aulas (idEvento, idWorkshop, duracao, horario)
VALUES (1, 2, "02:00:00", "2018-09-20 13:30:00");

INSERT Aulas (idEvento, idWorkshop, duracao, horario)
VALUES (1, 2, "05:00:00", "2018-09-20 16:30:00");

INSERT Aulas (idEvento, idWorkshop, duracao, horario)
VALUES (1, 2, "03:00:00", "2018-09-23 13:30:00");


INSERT AulaProf (idAula, idProfessor)
VALUES (1, 37592303821);

INSERT AulaProf (idAula, idProfessor)
VALUES (2, 27593203861);

INSERT AulaProf (idAula, idProfessor)
VALUES (3, 37592303821);


INSERT Alunos (nome, nascimento, projeto, colégio, idAula)
VALUES ("Beatriz Fonseca Guimarães", "2004/05/02", "Ismart Online", "EMEF Tarsila do Amaral", 2);

INSERT Alunos (nome, nascimento, projeto, colégio, idAula)
VALUES ("Lucas", "1996/05/02", "Ismart Online", "Lourenço Castanho", 3);

INSERT Alunos (nome, nascimento, projeto, colégio, idAula)
VALUES ("Isabella", "2000/05/02", "Ismart Online", "Insper", 1);

INSERT Alunos (nome, nascimento, projeto, colégio, idAula)
VALUES ("Isabella", "2000/05/02", "Ismart Online", "Insper", 1);

INSERT Alunos (nome, nascimento, projeto, colégio, idAula)
VALUES ("Isabella", "2000/05/02", "Ismart Online", "Insper", 2);

INSERT AulaAluno (idAula, idAluno)
VALUES (1, 1);
INSERT AulaAluno (idAula, idAluno)
VALUES (2, 1);
INSERT AulaAluno (idAula, idAluno)
VALUES (2, 2);
INSERT AulaAluno (idAula, idAluno)
VALUES (1, 3);
INSERT AulaAluno (idAula, idAluno)
VALUES (2, 3);


INSERT Professores (cpf, nome, curso, semestre, avaliacao, idAula)
VALUES (37513303821, "Lucas", "Engenharia da Computação", 5, 7.5, 1);


INSERT Professores (cpf, nome, curso, semestre, avaliacao, idAula)
VALUES (37513303888, "Lucas", "Engenharia da Computação", 5, 7.5, 2);