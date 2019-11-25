# Welcome!

## Server
Our server-based on Hapi eco-system,
we have api documentation that you can find here: [documentation](http://localhost:10211/documentation) 

### Server installation:
```sh
cd server
npm run install
docker-compose up migrate // should run createDb script which initilaizes the database and populates users data
docker-compose up 
```

#### Users
The seed script is located at: `/server/seeders/20190227152402-default-users.js`
and will create these accounts for login:
```
lior@anyvision.com
123456


bar@anyvision.com
123456
```


### Environment variables
```
LOG_LEVEL - Should be one of: debug/info/error
PORT- Define what port to run on 
SECURITY_JWT_SECRET- Secret key should be used for encryption 

// Database connections params
POSTGRES_PORT
POSTGRES_HOST
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
```

* Documentation - Built automatically with swagger plugin
* ORM - Sequelize library which runs on top of PostgreSQL database. 
* Logger - Custom logger that I built on top of Bunyan, while running on development will print formatted output instead of raw JSON. On production should be collected to centralized logging system(ELK).
* Health Check - `/healthcheck` endpoint should check db connection and return OK 200
* Graceful Shutdown - The web app server is listening for `SIGTERM`, `SIGINT`, `SIGKILL` signals, When those signals are received our server will stop listening for new requests and will free up resources (such as db connections).
* Schema Validation - Defined the payload schema with Joi which auto-generates the models schema in swagger documentation  

## Client
In development, webpack-dev-server is proxying all the api requests to the server even our server running on different port(10211) to avoid CORS.
The website will be up and running on port 3000 as default.

### client installation:
```sh
cd client
npm run install
npm run start 
```

