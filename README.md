## How to use the application

- Run to install the dependencies
```bash
$ pnpm install
```

- Create a copy of the .env.example file and fill in the variables
```bash
- NODE_ENV -> should be filled with "local", "test", "development" or "production"

- APPLICATION_PORT -> should be filled with your port

- APPLICATION_VERSION -> should be filled with the version

- APPLICATION_HOST -> should be filled with the application IP

- SWAGGER_TITLE -> should be filled with the title that is going to be displayed by swagger

- SWAGGER_DESCRIPTION -> should be filled with the description that is going to be displayed by swagger

- SWAGGER_PATH -> should be filled with the path to access swagger

- DATABASE_HOST -> should be filled with the database host IP

- DATABASE_PORT -> should be filled with the database host IP

- DATABASE_USERNAME -> should be filled with the database host IP

- DATABASE_PASSWORD -> should be filled with the database host IP

- DATABASE_NAME -> should be filled with the database host IP

- DATABASE_URL -> should be filled with the database Url

- JWT_SECRET -> should be filled with jwt secret
```

- Run the project with
```bash
$ pnpm start
```

- Access the project using
```bash
http://localhost:${APPLICATION_PORT}/${SWAGGER_PATH}
```

## The API can be accessed on 
```
https://url-shortener-myb8.onrender.com/docs
```

## Onde melhorar?
- A combinação de URLs pode se esgotar um dia dependendo da quantia criada, porém para isso é necessário ultrapassar 56.8 bilhões de combinações diferentes. Adicionando 1 ou 2 caracteres extras para a url curta seria possível aumentar essa combinação para mais de 3.5 trilhões de combinações.
- Eu utilizaria o keycloak para gerenciar as autenticações de forma que ele ficaria em frente de todos os serviços e poderia gerenciar os tokens sem a necessidade de criar um modulo de autorização para cada serviço.
- Para evitar o acesso recorrente ao banco de dados para localizar as URLs completas eu adicionaria uma camada de cache.
