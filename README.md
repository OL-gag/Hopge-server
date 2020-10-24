# Hopge-server

Hopge-server is a node.js application to generate hockey practices. REST API allows an user to create hockey practice with auto-selected drills.


# Prerequisites
    node --version v12.19.0
    PostgreSQL version 13 
    npm init   
    npm install --save express pg moment body-parser dotenv express-validator jsonwebtoken cors make-runnable bcryptjs @babel/polyfill npm-run-all
    npm install --save-dev babel-core babel-cli babel-preset-env babel-watch babel-preset-es2015 babel-register

# Endpoints
    PUT /api/practices/practice
    GET /api/practices/user/:id
    GET /api/practices/:id/drills
    GET /drills/:id
