# Desafio BBB
## to do
- adicionar serialization
- pagina para ver os contest ja finalizados
- assugurar que não terá bots
  - Rack Attack
- documentar SETUP
- documentar Arquitetura

## Links
[API DOC](https://documenter.getpostman.com/view/29899640/2sA3s7iojn)

### 1. Configurar o `.env` para a API

1. **Copie o arquivo de exemplo:**
   ```bash
   cp ./voting-api/.env.example ./voting-api/.env
   ```

2. **Abra o arquivo `.env` recém-criado em um editor de texto e ajuste as variáveis de ambiente conforme necessário.**

### 2. Configurar o `.env` para o Frontend

1. **Copie o arquivo de exemplo:**
   ```bash
   cp ./frontend/.env.example ./frontend/.env
   ```

2. **Abra o arquivo `.env` recém-criado em um editor de texto e ajuste as variáveis de ambiente conforme necessário.**

### Inicializar o Backend

1º Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.

2º Entre no diretório do backend

```
  cd voting-api
```

3º Construa e inicie os containers Docker:

```
docker-compose up --build
```

4º O servidor Rails estará disponível em http://localhost:3000.

### Inicializar o Frontend

1º Instale o http-server globalmente

```
npm install -g http-server
```

2º Entre no diretório

```
cd /frontend
```

3º Inicie o servidor

```
http-server
```

4º O servidor estará disponível em http://127.0.0.1:8080/
