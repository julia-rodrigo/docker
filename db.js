const knex = require('knex')

// // connnects to database, knex query builder
module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db', // just db becuasse its the name of tehs ervice and docker will replace this with the address of this container automatically
    user: 'docker', // user and databse name should always be the same
    password: '123456',
    database: 'docker',
  },
})

// const { Client } = require('pg');

// const client = new Client({
//     user: 'docker',
//     host: 'localhost',
//     database: 'docker',
//     password: '123456',
//     port: 4321,
// });

// client.connect();
