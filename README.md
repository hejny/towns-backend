# Towns backend


## Organization

https://trello.com/townsgame

https://trello.com/b/beAsHIkG/backend


## Authors of backend

**[SK] Stefan Kecskes:** https://www.skey.uk

**[PH] Pavol Hejný:** http://pavolhejny.com


## Folder Structure

    [towns5]/                   <- root adresár
	├── [bin]/
	|   └── www                     <- shell starter for node server
	├── [config]/                   <- central folder with all configurations
	|   ├── mongo.json              <- settings for mongoDb connection
	|   └── server.json             <- settings for api server
	├── [controllers]/              <- controllers for routes
	|   ├── [api]/                  <- json api controllers
	|   |   └── *.js                
	|   └── [http]/                 <- html controllers
	|       └── index.js            
	├── [layouts]/                  <- view templates for pages
	├── [migrations]/               <- schemas and seeds for mongoDB collections    
	|   └── 000x-*.js     
	├── [models]/                   <- collection models for mongoose
	|   ├── objects.js          
	|   └── validation.js           <- validations of models are here
	├── [public]/                   <- publicly accessible folder for node server 
	|   └── [css]/
	|       └── style.css
	├── [routes]/                   <- routes
	|   ├── index.js           
	|   └── users.js
	├── [test]/                     
	|   └── *.js                    <- tests for mochajs
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

We will assume that you already have installed **globaly node and npm**.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm:

	`npm install`


2. Create directory or symlink with project towns-shared in root



## Launching

Towns 5 Api server is node.js aplication and can be launched with command:

On develop environments:

	# for Linux and Mac use this
	DEBUG=api:* npm start
	# or with node monitor which will restart nodejs everytime API files are changed
	DEBUG=api:* npm run nodemonitor
	# for Windows use this
	set DEBUG=myapp & npm start

On production environments launch API simply without debug information

    npm start

Api will be accessible on http://localhost:3000

Tip: Consider using [pm2](https://www.npmjs.com/package/pm2) for running node server as service or managing multiple instances on one server

## Migrations

The code has also some default objects, which should be migrated into new mongoDB. This will show you the structure
of DB tables and adds you some objects to use with API.

Run changes in mongoDB schemas and seed new migrations (if necessary) by: 

    npm run mongo-migrate
    
DEVELOPERS ONLY: In case you want to drop all collections and create them again from migration collection use:
    
    npm run mongo-remigrate
    #if you want to remigrate testing mognoDB(mLab) use this instead
    npm run mongo-test-remigrate
	
## Testing

Start the server with correct NODE_ENV 
    
    NODE_ENV=test npm start
    #or
    npm run start-test

Test files are in `test` directory.

### 1. Linter

You can run tests for javascript syntax errors with linter, just run

	gulp test


### 2. Mocha
 
You can also run [Mocha](https://mochajs.org) testing framework with BDD style
[should.js](https://github.com/shouldjs/should.js) assertion library. Basically any assertion which throws error
will work. Don't forget that node with API must be running to be able to test.

	# in test environment
	npm test
	## or on dev machine
	make test

