# `This project is very old and not maintained for a long time. So expect a very pure code quality, outdated dependencies and security issues.`

# 🌆 Towns5 backend


## Organization

https://trello.com/townsgame

https://trello.com/b/beAsHIkG/backend


## Authors of backend

**[SK] Stefan Kecskes:** https://www.skey.uk

**[PH] Pavol Hejný:** http://pavolhejny.com


## Folder Structure

    [towns5]/                       <- root folder
	├── [bin]/                      <- all shell scripts for app
	|   └── www                     <- shell starter for node server
	├── [config]/                   <- central folder with all configurations
	|   ├── db.js                   <- settings for mongoDb connection
	|   └── server.js               <- settings for api server
	├── [controllers]/              <- controllers for routes
	|   ├── [api]/                  <- json api controllers
	|   |   └── *.js       
	|   ├── [http]/                 <- html controllers
	|   |   └── index.js     	         
	|   └── [middleware]/           <- middlewares
	|       └── *.js            
	├── [database]/                 <- data related classes
	|   ├── [backup]/               <- DB backups and backup script
	|   ├── [migrations]/           <- schemas and seeds for mongoDB collections    
    |	|   └── 00xy-*.js     
	|   ├── [models]/               <- collection models for mongoose
	|   |   └── *.js                <- all models sits here
	|   ├── [schemas]/              <- Schemas are partials of collections 
	|   |   └── *.js                
	|   ├── [seeds]/                
	|   |   └── *.js                <- seeded data
	|   └── [services]/             <- model helpers
	|       ├── mongoose.js         <- mongoose wrapper around DB 
	|       └── validation.js       <- validations of models are here
	├── [layouts]/                  <- view templates for pages
	├── [public]/                   <- publicly accessible folder for node server 
	|   └── [css]/
	|       └── style.css
	├── [routes]/                   <- routes
	|   └── *.js
	├── [test]/                     
	|   └── *.js                    <- tests for mocha.js
	├── .env                        <- environment variables (copy from .env.example and fill in details)
	├── .gitignore                  <- files ignored but git
	├── apiary.apib                 <- backup of API documentation from apiary 
	├── gulpgile.js                 <- configuration for linter testing
	├── Makefile                    
	├── package.json                <- npm packages
	└── server.js                   <- express starter


## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB


## Installation

We will assume that you already have installed **globally node and npm**.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm: `npm install`

2. copy .env.example to .env file and fill in the required details


## Launching

### Production and testing environment

Towns 5 Api server is node.js application and can be launched with command:

	npm start

In case you use node manager like pm2, then go to root folder of project and run

	pm2 start ./bin/www
	
### Develop environment

In case you need to debug it or on develop environments set environment variable DEBUG=api:* This is set differently on
Mac, Linux or windows. We also use nodemonitor, which detects changes in files and automatically restarts node.

For for debugging on Linux and Mac use this

	npm run start-debug
	
or for Windows use this
	
	set DEBUG=api:* & npm start

Api will be accessible on http://localhost:3000

Tip: Consider using [pm2](https://www.npmjs.com/package/pm2) for running node server as service or managing multiple instances on one server

## Migrations

The code has some default objects and schemes, which should be migrated into applications mongoDB.

Run new changes in mongoDB schemas and seed new migrations (if necessary) by running: 

    npm run mongo-migrate
    
You can easily backup current DB (using current the .env). It will be saved in folder like this: `/database/backup/db-20160412-1649.tar` by running:
 
    npm run mongo-backup
    
DEVELOPERS ONLY: In case you want to drop all collections and create them again from migration collection use:
    
    npm run mongo-remigrate
	
## Testing

Node loads automatically environment variables from .env file, therefore it have to be set to test environment. 
    
    npm run start
    
### with Linter

You can run tests for javascript syntax errors with linter, just run

	gulp test


### with Mocha
 
Test files are in `test` directory. You can run [Mocha](https://mochajs.org) testing framework with BDD style
[should.js](https://github.com/shouldjs/should.js) assertion library. Basically any assertion which throws error
will work. Don't forget that node with API must be running to be able to test.

	npm test

