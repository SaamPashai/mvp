require('colors');
require('dotenv').config();

let Connection = require('tedious').Connection;
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

let config = {
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    },
    server: 'capstonedemoserver.database.windows.net',
    options: { 
        encrypt: true,
        database: 'capstoneDummyDB',
        debug: {
            payload: true,
            token: false,
            log: true
        }
    }
}

let connection = new Connection(config);

// Debugging connection
connection.on('debug', text => console.log(text.yellow));

// Testing connection
connection.on('connect', function(err) {
    if (err) {
        console.log(`${err}`.red);
    } else {
        console.log();
        console.log('Connected'.green);
        executeStatement();
    }
});

// Executes sample statement from DB
function executeStatement() {
    console.log('Executing statement'.cyan);
    let request = new Request('SELECT * FROM Tasks', err => {
        if (err) {
            throw(err);
        }
    });

    var result = "";
    request.on('row', columns => {
        columns.forEach(column => {
            if (column.value === null) {
                console.log('NULL value found');
            } else {
                result += column.value + ' ';
            }
        });

        console.log(result);
    });

    request.on('done', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
    });

    connection.execSql(request);
}