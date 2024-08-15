# Desafio BBB
## to do
- confirmar com o Marcos se posso usar react.js para fazer o front
- assugurar que não terá bots
 - reCAPTCHA
 - Rack Attack
- ver a possibilidade de fazer um user admin
- fazer o design
- fazer o front
- documentar SETUP
- documentar Arquitetura

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
