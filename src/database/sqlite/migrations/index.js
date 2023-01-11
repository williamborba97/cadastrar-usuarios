//import the connection and the table  
//create the function for execute the tabble
//export the function
const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
};

module.exports = migrationsRun;