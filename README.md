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
