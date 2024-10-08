# Projeto FlexiLease Autos 🚜

> Uma FULL API REST para gerenciar uma locadora de carros.

## 📖 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Endpoints ](#Endpoints)
- [Como Usar](#como-usar)


## Sobre o Projeto

FlexiLease Autos é uma API desenvolvida para facilitar o gerenciamento de uma locadora de carros. Permitindo que os usuários reservem carros de forma prática e rápida.

## ⚙️ Funcionalidades:

- Cadrastro e listagem de carros
- Criação e autenticação de usuários
- Criação e edição de reservas de carros

## 💻 Tecnologias

- **Backend**: Node.js / Express / Typescript / ORM
- **Banco de Dados**: SQLite
- **Configurações**: ESlint e Prettier


## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/mariaduardasa/3-Desafio-NODE.JS.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd 3-Desafio-NODE.JS
    ```
3. Instale as dependências:
    ```bash
    npm install -y
    ```

4. Rodar a aplicação:
    ```bash
    npm start
    ```

## 📄 Endpoints

- 🚜 Carros :

     ```GET /car ```: Lista Carros: retorna a lista de carros.

    ```GET /car/:id``` : Buscar carro: retorna as informações de um carro
    específico.

     ```POST / car``` : Cadastrar carro: cria um novo carro.

     ```PUT/ car/:id``` : Atualizar carro: atualiza as informações de um carro
     existente.

     ```PATCH/ car/:id``` : Atualizar acessório: atualiza ou remove acessório.

    ```DELETE / car/:Id ```: Excluir carro: deleta um carro existente.


- 👥 Users :

    ```GET / user/:id``` : Buscar usuário: retorna as informações de  um usuário específico.

     ```POST / user``` : Cadastrar usuário: cria um novo usuário.

     ```PUT/ user/:id``` : Atualizar usuário: atualiza as informações de um usuário
     específico.

    ```DELETE / user/:Id ```: Excluir usuário: deleta um usuário específico.

    
- 🔒 Autenticação de usuário:

    ```POST / auth``` : Autenticar usuário: valida as credenciais.


- 📅 Reserve :

    ```GET /reserve ```: Lista Reservas: retorna a lista de reservas.

    ```GET / reserve/:id``` : Buscar reserva: retorna as informações de uma reserva existente.

     ```POST / reserve``` : Cadastrar reserva: cria uma nova reserva.

     ```PUT/ reserve/:id``` : Atualizar reserva: atualiza as informações de uma reserva
     específica.

    ```DELETE / reserve/:Id ```: Excluir reserva: deleta uma reserva específica.

    
## Como Usar

1. Acesse a API na URL: `http://localhost:3000/`.
2. Teste os Endpoints pelo Insomnia ou Postman.
3. Acesse o Swagger na URL: `http://localhost:3000/v1/docs/`