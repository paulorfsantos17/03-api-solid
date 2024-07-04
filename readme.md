# App

GymPass style app.


## RFs (Requisitos funcionais)
- [X] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas(até 10Km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [X] O usuário nao deve pode se cadastrar com um e-mail duplicado;
- [x] O usuário nao deve pode não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário nao deve pode fazer se nao tiver perto (100m) da academia;
- [X] O check-in so pode ser validado até 20 minutos após ser criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos nào-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisar estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisa  estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON WEB TOKEN)