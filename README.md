# Towns 5 API

* * *

## Struktura

[..]
├──	[api]                       <- root adresár
│   ├── app.js                  <- spúšťač - kontrollér
│   ├── [bin]/
│   │   └── www                 <- nastavnia pre node server
│   ├── package.json            <- npm balíkovač
│   ├── [migrations]/           <- schémy a seedy pre kolekcie v mongoDb    
│   │   └── 0005-objects.js     
│   ├── [models]/               <- modely kolekcií
│   │   └── objects.js          
│   ├── [public]/               <- verejný prístupný adresár pre node server 
│   │   ├── [images]/
│   │   ├── [javascripts]/
│   │   └── [stylesheets]/
│   │       └── style.css
│   ├── [routes]/               <- router
│   │   ├── index.js           
│   │   └── users.js
│   └── [views]/                <- views pre HTML stránky
│       ├── error.jade
│       ├── index.jade
│       └── layout.jade
│
└──	[config]                   <- centrálny adresár s configuráciou
    └── mongo.js               <- nastavenie pre mongoDb
	
* * *

## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB

* * *

## Inštalácia

Predpokladám že node aj npm už máte nainštalované globálne.

1. Doinštalovať potrebné balíky (express framework, atď) cez npm balíkovač


	npm install
			

2. Instalovanie zmien schem z migracnych suborov do mongoDB 

    npm run mongo-migrate
    
* * *

## Spustenie

Towns 5 Api server je node.js aplikácia a spúšťa sa jednoduchým príkazom:

	# na Linuxe a Macu takto
	DEBUG=api:* npm start
	# alebo na Windowse takto
	set DEBUG=myapp & npm start

Api bude bezat na http://localhost!3000

* * *
	
## Testovanie

//todo