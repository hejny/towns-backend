# Towns 5 API

* * *

## Folder Structure

    [..]
    ├──	[api]                       <- root folder
    │   ├── app.js                  <- controller
    │   ├── [bin]/
    │   │   └── www                 <- shell settings for node server
    │   ├── package.json            <- npm packages
    │   ├── [migrations]/           <- schemas and seeds for mongoDB collections    
    │   │   └── 0005-objects.js     
    │   ├── [models]/               <- collection models for mongoose
    │   │   └── objects.js          
    │   ├── [public]/               <- publicly accessible folder for node server 
    │   │   ├── [images]/
    │   │   ├── [javascripts]/
    │   │   └── [stylesheets]/
    │   │       └── style.css
    │   ├── [routes]/               <- router
    │   │   ├── index.js           
    │   │   └── users.js
    │   └── [views]/                <- views for HTML responses
    │       ├── error.jade
    │       ├── index.jade
    │       └── layout.jade
    │
    └──	[config]                   <- central folder with all configurations
        └── mongo.js               <- settings for mongoDb connection
	
* * *

## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB

* * *

## Installation

We will assume that you already have installed globaly node and npm.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm:

	`npm install`
			
2. Run changes in mongoDB schemas and seed new migrations (if necessary) by: 

    `npm run mongo-migrate`
    
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

* * *
	
## Testing

//todo