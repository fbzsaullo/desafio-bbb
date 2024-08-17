# Desafio BBB
## to do
- adicionar serialization
- pagina para ver os contest ja finalizados
- assugurar que não terá bots
  - Rack Attack
- documentar SETUP
- documentar Arquitetura

## SETUP

Este projeto pode ser configurado utilizando o `docker-compose` ou o `make` para facilitar a execução dos comandos. Siga as instruções abaixo para configurar e iniciar o ambiente de desenvolvimento.

### Pré-requisitos

- Docker
- Docker Compose
- Make (opcional) [VER TODOS COMANDOS MAKE](./Makefile)

### Passos para Configuração

#### Usando Docker Compose

1. **Construir as imagens Docker:**

   ```bash
   docker-compose build
   ```

2. **Iniciar os containers:**

   ```bash
   docker-compose up
   ```

#### Usando Make

Se preferir utilizar o `make`, os seguintes comandos estão disponíveis:

1. **Construir as imagens Docker:**

   ```bash
   make build
   ```

2. **Iniciar os containers:**

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

### Acessando o App

Após iniciar os containers, os serviços estarão disponíveis nos seguintes endereços:
- **Back-end:** http://localhost:3000
- **Front-end:** http://localhost:3001

Certifique-se de que todas as dependências foram instaladas corretamente e os containers estão rodando antes de acessar o app.

## API - ENDPOINTS

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
    {
        "id": 3,
        "name": "João Silva",
        "created_at": "2024-08-17T06:56:50.248Z",
        "updated_at": "2024-08-17T06:56:50.311Z",
        "photo_url": "/uploads/Joao_Silva.jpg"
    },
    {
        "id": 4,
        "name": "Mariana Lima",
        "created_at": "2024-08-17T07:01:01.331Z",
        "updated_at": "2024-08-17T07:01:01.608Z",
        "photo_url": "/uploads/Mariana_Lima.jpg"
    }
]
```

---

#### POST /api/participants
**Descrição:** Cria um novo participante.

**Body (JSON):**
```json
{
  "participant": {
    "name": "Carinha Mascarado",
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
