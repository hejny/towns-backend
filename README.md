# Towns backend

* * *

## Organization

https://trello.com/townsgame

https://trello.com/b/beAsHIkG/backend

* * *

## Authors of backend

**[SK] Stefan Kecskes:** https://www.skey.uk

**[PH] Pavol Hejný:** http://pavolhejny.com




* * *

## Folder Structure

    
    [bin]/
    └── www                     <- shell starter for node server
    [config]/                   <- central folder with all configurations
    └── mongo.json              <- settings for mongoDb connection
    [layouts]/                  <- view templates for pages
    [migrations]/               <- schemas and seeds for mongoDB collections    
    └── 0005-objects.js     
    [models]/                   <- collection models for mongoose
    └── objects.js          
    [public]/                   <- publicly accessible folder for node server 
    └── [css]/
        └── style.css
    [routes]/                   <- router
        ├── index.js           
        └── users.js
	.gitignore
    package.json                <- npm packages
    app.js                      <- controller
	server.js

	
* * *

## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB

* * *

## Installation

We will assume that you already have installed **globaly node and npm**.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm:

	`npm install`
    
* * *

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

Api will be accessible on http://localhost!3000

## Migrations

The code has also some default objects, which should be migrated into new mongoDB. This will show you the structure of DB tables and adds you some objects to use with API.

Run changes in mongoDB schemas and seed new migrations (if necessary) by: 

    `npm run mongo-migrate`
    
DEVELOPERS ONLY: In case you want to drop all collections and create them again from migration collection use:
    
    `npm run mongo-remigrate`

* * *
	
## Testing

//todo