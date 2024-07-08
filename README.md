<h1 align="center"> Nest-Cognito </h1>

## 📄 Descrição do projeto

Repositório básico demonstrando o funcionamento de uma API GraphQL com Nest.

## 🛠 Funcionalidades do Projeto

- Cadastro de usuários
- Exclusão de usuários
- Listar informações do usuário
- Login

## 🚩 Requisitos

- [Git](https://www.git-scm.com/downloads);
- [Docker](https://www.docker.com/products/docker-desktop/);

## 💻 Como iniciar

- Para iniciar execute os seguintes comandos
- Recomendado usar o terminar do WSL/linux ou Git Bash para funcionar corretamente todos os comandos
- Abrir terminal

- Clone o repositorio na sua máquina local.

```sh
git clone https://github.com/JeanCarlosDelai/Nest-Cognito.git
```

- Acesse a pasta clonada

```sh
cd Nest-Cognito
```

- Criar arquivo .env com base no arquivo de exemplo, para configuração de variáveis de ambiente:

```sh
cp .env.example .env
```

- Rode o docker compose para criar os containers

```sh
docker-compose up -d
```

- Irá gerar 3 containers

- postgres_db: Rodará o banco de dados PostgresSQL
- adminer # Container com uma interface gráfica para verificar a estrutura do banco de dados:
  Acesse atráves do link: [localhost:8080](http://localhost:8080)
- nest_api: Aonde rodará a aplicação:
  Acesse atráves do link: [localhost:3000](http://localhost:3000/graphql)

## ❌ Remover recursos

- Após rodar a aplicação finalizar os containers com o comando

```sh
docker-compose down
```

## ✅ Tecnologias utilizadas

- Linguagem: `Typescript`
- Ambiente te execução: `Node.js`
- Framework BackEnd: `Nest.js`

## 👨🏻‍💻 Desenvolvedor

[<img src="https://avatars.githubusercontent.com/u/112594276?v=4" width="80px;"/>](https://github.com/JeanCarlosDelai)
