#APP
GymPass style app.

## RFs (Requisitos funcionais)


- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticvar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias proximas
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia.

## RNs (Regras de négocio)

- [x] O usuário nao deve poder se cadsatrar com um e-mail duplicado
- [x] O usuário nao poder fazer 2 check-ins no mesmo dia
- [x] O usuário nao pode fazer check-in se nao tiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos apos criado
- [x] O check-in só pode ser validado por ADM
- [x] A acadedmia só pode ser cadastrada por ADM

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário procisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostegreSQL
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por pagina
- [x] O usuário deve ser identificado por um JWT