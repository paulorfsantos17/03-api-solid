# App

GymPass style app.


## RFs (Requisitos funcionais)
- [X] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [X] O usuário nao deve pode se cadastrar com um e-mail duplicado;
- [ ] O usuário nao deve pode não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário nao deve pode fazer se nao tiver perto (100m) da academia;
- [ ] O check-in so pode ser validado até 20 minutos após ser criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos nào-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisar estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisa  estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON WEB TOKEN)