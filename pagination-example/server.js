const express = require("express");
const mongoose = require ('mongoose');

const Users = require('./users');
const PORT = 6000
const app = express()

mongoose.connect('mongodb://localhost/pagination');


const users = [
    { id: 1, name: 'user 1' },
    { id: 2, name: 'user 2' },
    { id: 3, name: 'user 3' },
    { id: 4, name: 'user 4' },
    { id: 5, name: 'user 5' },
    { id: 6, name: 'user 6' },
    { id: 7, name: 'user 7' },
    { id: 8, name: 'user 8' },
    { id: 9, name: 'user 9' },
    { id: 10, name: 'user 10' },
    { id: 11, name: 'user 11' }
]

const posts = [
    { id: 1, name: 'Posts 1' },
    { id: 2, name: 'Posts 2' },
    { id: 3, name: 'Posts 3' },
    { id: 4, name: 'Posts 4' },
    { id: 5, name: 'Posts 5' },
    { id: 6, name: 'Posts 6' },
    { id: 7, name: 'Posts 7' },
    { id: 8, name: 'Posts 8' },
    { id: 9, name: 'Posts 9' },
    { id: 10, name: 'Posts 10' },
    { id: 11, name: 'Posts 11' }
]
app.get('/posts', paginatedResults(posts), async (req, res) => {

    res.json(res.paginatedResults);
})

app.get('/users', paginatedResults(users), async (req, res) => {
    
    res.json(res.paginatedResults);
})

function paginatedResults(model){
    return (req, res, next) => {

        const page =  Number(req.query.page);
        const limit =  Number(req.query.limit); // changed
        const startIndex = (page - 1) * limit;
        const endIndex = (page * limit);
        const results = {};

        if ( endIndex < model.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if ( startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.results = model.slice(startIndex, endIndex);
        res.paginatedResults = results;
        console.log("page: " + page);
        next();
    }
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
