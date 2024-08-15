# Desafio BBB
## to do
- adicionar name ao contest
- pagina para ver os contest ja finalizados
- participant image
- mostrar votos por hora
- assugurar que não terá bots
  - reCAPTCHA
  - Rack Attack
- ver a possibilidade de fazer um user admin
- fazer o front
- documentar SETUP
- documentar Arquitetura

## Links
[API DOC](https://documenter.getpostman.com/view/29899640/2sA3s7iojn)

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
