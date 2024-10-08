# Desafio BBB - [Entrar no site](http://134.209.79.54:3001/)

## Descrição

 Aplicação web inspirada no Big Brother Brasil, onde os usuários podem votar em seus participantes preferidos em um sistema de 'paredão'. A aplicação consiste em um frontend interativo feito em React.js com Vite, e um backend robusto construído em Ruby on Rails. O sistema é capaz de lidar com um alto volume de votos simultâneos e apresenta atualizações em tempo real dos resultados de votação.

 ## Índice
- [Tecnologias](#tecnologias)
- [Setup](#setup)
  - [Pré-requisitos](#pré-requisitos)
  - [Passos para Configuração](#passos-para-configuração)
    - [Usando Docker Compose](#usando-docker-compose)
    - [Usando Make](#usando-make)
    - [Setup Sem Docker/Make](#sem-usar-o-docker)
  - [Parar e Remover Containers](#parar-e-remover-containers)
  - [Acessando o App](#acessando-o-app)
  - [Acessar o Dashboard](#acessar-o-dashboard)
  - [Rodar testes](#rodar-testes)
- [Funcionalidades](#funcionalidades)
  - [Usuário (não logado)](#usuário-não-logado)
  - [Usuário (logado)](#usuário-logado)
  - [Concurso](#concurso)
  - [Voto](#voto)
- [Soluções](#soluções)
  - [Impedir Bots](#impedir-votos-de-bots)
  - [Volume Elevado de Votos](#gerenciamento-de-volume-elevado-de-votos)
  - [Autenticação Segura](#autenticação-segura)
  - [Testes Automatizados com RSpec](#testes-automatizados-com-rspec)
  - [CI/CD Automatizado](#cicd-automatizado)
  - [Docker e Docker Compose](#docker-e-docker-compose)
- [Arquitetura](#arquitetura)
- [API - ENDPOINTS](#api---endpoints)
  - [Contests](#contests)
  - [Participants](#participants)
  - [Votes](#votes)
  - [User](#user)

## [Tecnologias](#desafio-bbb)
- **Backend:**
  - **Ruby:** 3.1.2
  - **Rails:** 7.1.3
  - **Sidekiq:** Para processamento de jobs em background.
  - **Redis** Utilizado como sistema de filas para o Sidekiq e para cache.
  - **Banco de dados:** PostgreSQL
- **Frontend:**
  - **Node.js**
  - **React**
  - **Vite:** Ferramenta de build para desenvolvimento rápido e eficiente.

## [Setup](#desafio-bbb)

Este projeto pode ser configurado utilizando o `docker-compose` ou o `make` para facilitar a execução dos comandos. Siga as instruções abaixo para configurar e iniciar o ambiente de desenvolvimento.

## Pré-requisitos

- **[Ruby](https://www.ruby-lang.org/en/documentation/installation/)**: 3.1.2
- **[Rails](https://guides.rubyonrails.org/getting_started.html#installing-rails)**: 7.1.3
- **[Node.js](https://nodejs.org/en/download/)**
- **[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)**
- **[Docker](https://www.docker.com/get-started)**
- **[Docker Compose](https://docs.docker.com/compose/install/)**
- **[Make (opcional)](https://www.gnu.org/software/make/)**

### Passos para Configuração

1. **Clonar o repositório:**

   ```bash
   git clone git@github.com:fbzsaullo/desafio-bbb.git
   cd desafio-bbb
   ```

### Passos para Configuração

1. **Clonar o repositório:**

   ```bash
   git clone git@github.com:fbzsaullo/desafio-bbb.git
   cd desafio-bbb
   ```

2. **Instalar as dependências do frontend:**

   Navegue até o diretório `frontend` e instale as dependências necessárias:

   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Configurar variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

#### Usando Docker Compose

4. **Construir as imagens Docker:**

   ```bash
   docker-compose build
   ```

5. **Iniciar os containers:**

   ```bash
   docker-compose up
   ```

#### Usando Make

Se preferir utilizar o `make`, os seguintes comandos estão disponíveis:

4. **Construir as imagens Docker:**

   ```bash
   make build
   ```

5. **Iniciar os containers:**

   ```bash
   make start
   ```
   
### Parar e Remover Containers

Para parar os containers e remover as redes, execute:

```bash
docker-compose down
```

Ou, se estiver usando `make`:

```bash
make stop
```

### Sem usar o Docker

Se você preferir configurar o projeto manualmente sem usar Docker, siga os passos abaixo:

#### Configurando o Backend (Rails)

1. **Instale as dependências do backend:**

   ```bash
   cd voting-api
   bundle install
   ```

2. **Crie e migre o banco de dados:**

   Com o banco de dados configurado, execute os seguintes comandos para criar e migrar as tabelas:

   ```bash
   rails db:create
   rails db:migrate
   ```

3. **Instale o Redis:**

   O Redis é utilizado pelo Sidekiq para gerenciar as filas de jobs em background. Siga os passos abaixo para instalar e configurar o Redis:

   - No **Ubuntu/Debian**:

     ```bash
     sudo apt-get update
     sudo apt-get install redis-server
     ```

   - No **macOS** (usando Homebrew):

     ```bash
     brew install redis
     ```

4. **Inicie o Redis:**

   ```bash
   redis-server
   ```

5. **Inicie o Sidekiq:**

   O Sidekiq processa os jobs em background. Certifique-se de que o Redis esteja rodando e, em seguida, inicie o Sidekiq:

   ```bash
   bundle exec sidekiq -C config/sidekiq.yml
   ```

6. **Inicie o servidor Rails:**

   Agora, você pode iniciar o servidor do backend:

   ```bash
   rails server
   ```

#### Configurando o Frontend (React)

1. **Instale as dependências do frontend:**

   Navegue até o diretório `frontend` e instale as dependências:

   ```bash
   cd ../frontend
   npm install
   ```

2. **Inicie o servidor de desenvolvimento do Vite:**

   Agora, você pode iniciar o servidor de desenvolvimento para o frontend:

   ```bash
   npm run dev
   ```

### Acessando o App

Após iniciar os containers, os serviços estarão disponíveis nos seguintes endereços:
- **Back-end:** http://localhost:3000
- **Front-end:** http://localhost:3001

Certifique-se de que todas as dependências foram instaladas corretamente e os containers estão rodando antes de acessar o app.

### Acessar o Dashboard
Para acessar o dashboard do aplicativo, você precisará criar um usuário diretamente no console do Rails. Siga os passos abaixo de acordo com a forma que você está utilizando para rodar o ambiente.

**Usando Docker:**
  ```bash
  docker-compose run web rails console
  ```

  ```ruby
  User.create(email: 'seu@email.com', password: 'senha123')
  ```

**Usando Make:**
  ```bash
  make console
  ```

  ```ruby
  User.create(email: 'seu@email.com', password: 'senha123')
  ```

**Manual *(Sem Docker)*:**
  ```bash
  cd voting-api
  rails console
```

  ```ruby
  User.create(email: 'seu@email.com', password: 'senha123')
  ```

### Rodar testes

Para parar os testes SPECs do Rails

**Usando Docker:**
  ```bash
  docker-compose run web bundle exec rspec
  ```

**Usando Make:**
  ```bash
  make test
  ```

  - Para rodar um teste específico:
    ```bash
    make specific_test FILE=/app/spec/models/match_spec.rb
    ```
**Manual *(Sem Docker)*:**
  ```bash
  cd voting-api
  bundle exec rspec
  ```

## [Funcionalidades](#desafio-bbb)

### Usuário (não logado):
- **Votação Ilimitada:** Pode votar quantas vezes desejar.
- **Login para Produção:** Pode realizar login caso seja um usuário da produção.

### Usuário (logado):
- **Dashboard do Concurso Ativo:** Acesso a um painel com informações detalhadas do concurso atualmente ativo.
- **Criação de Participantes:** Possibilidade de criar novos participantes para os concursos.
- **Criação de Concursos:** Pode iniciar novos concursos, respeitando as regras de status dos concursos.
- **Visualização de Concursos:** Pode visualizar a lista completa de todos os concursos já criados, incluindo ativos e concluídos.

### Concurso
- **Status de Criação:** Concursos são criados com o status `'active'`.
- **Regras de Criação:** Um novo concurso só pode ser criado se todos os outros concursos existentes tiverem o status `'completed'`.

### Voto
- **Validação por reCAPTCHA:** O voto só é computado após a validação bem-sucedida do reCAPTCHA, garantindo que é uma interação humana.

## [Soluções](#desafio-bbb)

### Impedir Votos de Bots
- reCAPTCHA para verificar a autenticidade do usuário antes do envio do voto.

### Gerenciamento de Volume Elevado de Votos
- Jobs em background para processar os votos, garantindo escalabilidade e desempenho durante picos de acesso.

### Autenticação Segura
- **Uso de JWT (JSON Web Tokens):** Garantir que todos os requests que requerem autenticação utilizem tokens JWT para validar o usuário. Isso assegura que apenas usuários autenticados possam acessar ou realizar determinadas ações, como enviar votos, garantindo a integridade e segurança do processo de votação.

### Testes Automatizados com RSpec
- **Cobertura Abrangente:** Utilizar RSpec para garantir uma cobertura completa dos testes, incluindo testes de unidade, integração, e requisições (request specs), assegurando que todas as partes do código, desde a lógica de negócios até as interações com a API, funcionem como esperado.

### CI/CD Automatizado
- **Pipeline Automatizado:** Configurar um pipeline CI/CD que executa testes automatizados, constrói e verifica a aplicação Rails e React em cada push e pull request na branch main.
- **Deploy Seguro:** Verificar a execução correta das aplicações backend e frontend após a construção e antes do deploy.

### Docker e Docker Compose
- **Ambiente de Desenvolvimento Consistente:** Utilizar Docker Compose para orquestrar os serviços necessários, incluindo o banco de dados Postgres, Redis, a aplicação Rails, Sidekiq e o app React, garantindo um ambiente de desenvolvimento consistente para todos os desenvolvedores.
- **Isolamento de Serviços:** Cada componente (API, Sidekiq, frontend) roda em seu próprio contêiner, facilitando a manutenção e o isolamento de falhas.
- **Facilidade de Escalabilidade:** Configurar os serviços de forma que possam ser facilmente escalados horizontalmente, se necessário, apenas ajustando a configuração do Docker Compose.

## [Arquitetura](#desafio-bbb)

- **Frontend:** Responsável pela interface gráfica com o usuário, utilizando React com Vite para renderizar formulários de votação, painéis de resultados e outras informações relevantes.

- **Backend:** Implementado em Rails, o backend lida com a lógica de negócio, incluindo a validação dos votos, processamento dos resultados e comunicação com o banco de dados.

- **Banco de dados:** Utiliza PostgreSQL como banco de dados relacional para armazenamento dos dados da aplicação. Abaixo, segue a estrutura das principais tabelas utilizadas:

[![](https://mermaid.ink/img/pako:eNqtVM1uwjAMfpUoZ3iB3hDjwGGAaLfDVKkyiVciaFIl7qap9N2XUihDa7dOa06OP_98dmKXXBiJPOBoHxSkFrJYM3-ewsU2ZGVzqc9OpUoTU_KmcmSVThlmoI7ftDk4926sTKRK0dENl0BIKkMmLHpRJtAFFrm8A6tYN8Jmto2W8-VmtooG8tOQ4Wjp5-tVtAiHpnYEVLixkyd_6MFFJYwm_wpJB5SDJSVUDvoe_ifX57WnOoxcH4MfuI_5iU6n6dSUDeGAxdyiwB2yN0PGxbzfoes1av-2HD8ZV__22_ziS5h9bQe6vgC9bPmEZ2j9SEo_1Of2-6h79CPAa3MJ9lCbVd4OCjLhhxY8IFvghFtTpHsevMLR-VvTvMtSaLUoFRn72OyM8-qY-IL1izFXm-oTYAZYfQ?type=png)](https://mermaid.live/edit#pako:eNqtVM1uwjAMfpUoZ3iB3hDjwGGAaLfDVKkyiVciaFIl7qap9N2XUihDa7dOa06OP_98dmKXXBiJPOBoHxSkFrJYM3-ewsU2ZGVzqc9OpUoTU_KmcmSVThlmoI7ftDk4926sTKRK0dENl0BIKkMmLHpRJtAFFrm8A6tYN8Jmto2W8-VmtooG8tOQ4Wjp5-tVtAiHpnYEVLixkyd_6MFFJYwm_wpJB5SDJSVUDvoe_ifX57WnOoxcH4MfuI_5iU6n6dSUDeGAxdyiwB2yN0PGxbzfoes1av-2HD8ZV__22_ziS5h9bQe6vgC9bPmEZ2j9SEo_1Of2-6h79CPAa3MJ9lCbVd4OCjLhhxY8IFvghFtTpHsevMLR-VvTvMtSaLUoFRn72OyM8-qY-IL1izFXm-oTYAZYfQ)

## [API - ENDPOINTS](#desafio-bbb)

### Contests

#### GET /api/contests
**Descrição:** Retorna uma lista de todos os contests cadastrados.

**Parâmetros de URL:** Nenhum.

**Headers:**
- `Content-Type: application/json`

**Exemplo de Response:**
```json
[
    {
        "id": 1,
        "status": "completed",
        "created_at": "2024-08-17T06:56:56.060Z",
        "updated_at": "2024-08-17T06:57:18.626Z",
        "total_votes": 5,
        "winner": {
            "id": 3,
            "name": "João Silva",
            "photo_url": "/uploads/Joao_Silva.jpg",
            "total_votes": 3
        }
    },
    {
        "id": 2,
        "status": "active",
        "created_at": "2024-08-17T07:01:53.196Z",
        "updated_at": "2024-08-17T07:01:53.196Z",
        "total_votes": 0,
        "winner": null
    }
]
```

---

#### GET /api/contests/actived
**Descrição:** Retorna os detalhes de um contest ativo.

**Parâmetros de URL:** Nenhum.

**Headers:**
- `Content-Type: application/json`
- `Authorization`: JWT Token em string

**Exemplo de Response:**
```json
{
    "contest": {
        "id": 2,
        "status": "active",
        "created_at": "2024-08-17T07:01:53.196Z",
        "updated_at": "2024-08-17T07:01:53.196Z"
    },
    "total_votes": 0,
    "participants": [
        {
            "id": 1,
            "name": "Carlos Pereira",
            "photo_url": "/uploads/Carlos_Pereira.jpg",
            "percentage": 0,
            "total_votes": 0
        },
        {
            "id": 2,
            "name": "Ana Souza",
            "photo_url": "/uploads/Ana_Souza.jpg",
            "percentage": 0,
            "total_votes": 0
        }
    ]
}

```

---

#### POST /api/contests
**Descrição:** Cria um novo contest.

**Body (JSON):**
```json
{
  "contest": {
    "participant_ids": [1, 2] 
  }
}
```

**Headers:**
- `Content-Type: application/json`
- `Authorization`: JWT Token em string

---

#### PATCH /api/contests/:id/complete
**Descrição:** Muda o status do contest para completado.

**Parâmetros de URL:** Nenhum.

**Headers:**
- `Content-Type: application/json`
- `Authorization`: JWT Token em string

---

### Participants

#### GET /api/participants
**Descrição:** Retorna uma lista de todos os participantes.

**Parâmetros de URL:** Nenhum.

**Headers:**
- `Content-Type: application/json`

**Exemplo de Response:**
```json
[
    {
        "id": 1,
        "name": "Carlos Pereira",
        "created_at": "2024-08-17T06:56:23.129Z",
        "updated_at": "2024-08-17T06:56:23.422Z",
        "photo_url": "/uploads/Carlos_Pereira.jpg"
    },
    {
        "id": 2,
        "name": "Ana Souza",
        "created_at": "2024-08-17T06:56:34.737Z",
        "updated_at": "2024-08-17T06:56:34.773Z",
        "photo_url": "/uploads/Ana_Souza.jpg"
    },
]
```

---

#### POST /api/participants
**Descrição:** Cria um novo participante.

**Body (JSON):**
```json
{
  "participant": {
    "name": "Carlos Pereira",
    "photo_base64": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODww"
  }
}
```

**Headers:**
- `Content-Type: application/json`
- `Authorization`: JWT Token em string

**Exemplo de Response:**

---

### Votes

#### POST /api/contests/:contest_id/participants/:participant_id/votes
**Descrição:** Registra um voto para um participante em um contest específico.

**Parâmetros de URL:**
- `contest_id` (obrigatório): O ID do contest onde o voto será registrado.
- `participant_id` (obrigatório): O ID do participante que receberá o voto.

**Headers:**
- `Content-Type: application/json`

---

### User

#### POST /api/login
**Descrição:** Autentica o usuário.

**Body (JSON):**
```json
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

**Exemplo de Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MjM5NjQ5NTJ9.5kW9AqGRslq5IT94W6BRbzvTOGHOmNAhgd18kt3rNAw",
  "expires_at": "2024-08-18T05:43:20.508Z"
}
```
