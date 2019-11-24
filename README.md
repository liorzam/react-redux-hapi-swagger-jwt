# Welcome!

## Server
Our server-based on Hapi ecosystem,
we have detailed api  that you can find here: [documentation](http://localhost:10211/documentation) 

### Server installation:
```sh
cd server
npm run install
docker-compose up
```

### Environment variables
```
LOG_LEVEL
PORT
SECURITY_JWT_SECRET
POSTGRES_LOG
POSTGRES_PORT
POSTGRES_HOST
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
```

* Documentation - build automatically with swagger plugin
* ORM - Sequelize library which runs on top PostgreSQL database. 
* Logger - Custom logger that I built on top on Bunyan, while running on development will print formatted output instead of raw JSON on production, should be collected to centralized logging system(ELK)
* Health Check - `/healthcheck` endpoint should check db connection and  return OK 200
* Graceful shutdown - The web app server listening for `SIGTERM`, `SIGINT`, `SIGKILL` signals.
* Schema Validation - Defined the payload schema with Joi which auto-generate the models schema in swagger 

## Client
In development, webpack-dev-server is proxying all the api requests to the server even our server running on different port(10211) to avoid CORS.
The website will be up and running on port 3000 as default.

### client installation:
```sh
cd client
npm run install
npm run start 
```

