
// const { Client } = require('pg');

// const client = new Client({
//     user: 'docker',
//     host: 'localhost',
//     database: 'docker',
//     password: '123456',
//     port: 4321,
// });

// client.connect();

const client = require('./db');


const getUsers = (req, res) => {
    const pageSize = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 10;
    const pageNr = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 1;
    
    const startIndex = (pageNr - 1) * pageSize;
    const endIndex = (pageNr * pageSize);
    const results = {};
  
    const users = await db.select().from('users');
  
  
    if ( endIndex < users.length){
        results.next = {
            pageNr: pageNr + 1,
            pageSize: pageSize
        }
    }
  
    if ( startIndex > 0){
        results.previous = {
            pageNr: pageNr - 1,
            pageSize: pageSize
        }
    }
  
    results.results = users.slice(startIndex, endIndex);
    res.json(results)
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name } = request.body

  client.query('INSERT INTO users (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  client.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [ email, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}