const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const app = express()
const db = require('./db');

const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/frontend", express.static('./frontend/'));

app.get('/', (req, res) => {
  res.sendFile('./frontend/home.html', {root: __dirname}) 
  //next(new Error ("cannot get the data from the database")) // eroor https://www.youtube.com/watch?v=yNO-eA-8Fuo
});

// fetching users
app.get('/users', async (req, res) => {
  var pageSize = (typeof(req.query.pageSize) !== 'undefined') ? Number(req.query.pageSize) : 10;
  var pageNr = (typeof(req.query.pageNr) !== 'undefined') ? Number(req.query.pageNr) : 1;
  var sortOrder = (typeof(req.query.sortOrder) !== 'undefined') ? (req.query.sortOrder) : 'asc';
  var sortBy = (typeof(req.query.sortBy) !== 'undefined') ? (req.query.sortBy) : 'id';

  //res.send([{ checkObject: checkObject(req.query), pageSize, typePageS: typeof pageSize, check: hasCharacters(pageSize), check2: pageSize <= 0 }]);

    if(!hasWrongParameters(req.query))
    {
      if(hasCharacters(pageSize) || pageSize <= 0 ) res.send([{ pageSize, error: 404, message: 'This parameter cannot be less than 0 or have a string value' }])
      else if( hasCharacters(pageNr) || pageNr <= 0 ) res.send([{ pageNr, error: 404, message: 'This parameter cannot be less than 0 or have a string value' }])
      else if(sortOrder !== 'asc' && sortOrder !== 'desc') res.send([{ sortOrder,  error: 404, message: 'Only "asc" and "desc" is accepted' }])
      else if(sortBy !== 'id' && sortBy !== 'name') res.send([{ sortBy, error: 404, message: 'Only "id" and "name" is accepted' }])
      else
      {
        //res.send('uhhhh')
        const users = 
          await db
            .select().from('users')
            .orderBy( sortBy , sortOrder )
            .limit(pageSize)
            .offset(pageSize * (pageNr - 1))
            .then(result => {
              if(result.length === 0) res.send([{ error: 404, message: "there are no further users in this database" }]) // discussable, can return empty list
              else res.json(result);
            })
            .catch(err => res.status(500).send([{err, message: err.message}]));
      }     
  }
    else {
      res.send({ error: 404, message: "A parameter doesn't exist", details:  sendDetails(req.query), parameters: req.query });
  }
})

// get all raw data
app.get('/everyone', async (req, res) => {
  db.raw('select * from users').then((result) => {
    res.send(result);
  })
})

//get user by id
app.get('/users/:id', async (req, res) => {
  var id = (req.params.id);
  if(id < 0 || hasCharacters(id) ) res.send([{ id, error: 404, message: 'This parameter cannot be negative or have a string value' }])
  else {
    const user = 
      await db.select().from('users').where('id', parseInt(id)).then((result) => {
        if(result.length === 0) res.send([{ error: 404, message: "there is no user like that here" }])
        else res.send(result);
      }).catch(err => res.status(500).json([{err, message: err.message}]));
  }
});

// creating users
app.post('/users', async (req, res) => {
  const user = await db('users').insert({ name: req.body.name }).returning('*')
  res.json(user)
})

app.use((req, res, next) => {
  const error = new Error("page not found")
  error.status = 404;
  next(error);
})

// erorr handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send({
    error: {
      status: error || 500,
      message: error.message
    }
  })
})

function sendDetails( data ) { // go through data
  var message = [];
  props = Object.keys(data);
  var set = new Set(props);

  for (var i = 0; i < props.length; i++) set.add(props[i]);
  set = filter(set, ['pageSize', 'pageNr', 'sortOrder', 'sortBy']);

  for(let item of set){
    message.push(item + ": This parameter doesn't exist");
  }
  if(message.length >0) return message ;
  else return [ "No errors" ];
}

function hasCharacters( data ){
  if(/^[0-9]+$/.test(data)  || data.length == 0 ) 
  
      return false; // characters and numbers
      return true; // only numbers
}

function hasWrongParameters( data ) {
  props = Object.keys(data);
  var set = new Set(props);

  for (var i = 0; i < props.length; i++) set.add(props[i]);
  set = filter(set, ['pageSize', 'pageNr', 'sortOrder', 'sortBy']);

  if (set.size > 0 ) return true;
  return false;
}

function filter( set, toFilter ) {
  for(var i = 0; i < toFilter.length; i++){
    if(set.has(toFilter[i])) set.delete(toFilter[i])
  }
  return set;
}


// function checkValue ( parameter ) {
//   return [{
//     parameter,
//     type: typeof parameter,
//   }]
// }

// function getType( oObj )
// {
//     if( typeof oObj === "object" )
//     {
//           return ( oObj === null )?'Null':
//           // Check if it is an alien object, for example created as {world:'hello'}
//           ( typeof oObj.constructor !== "function" )?'Object':
//           // else return object name (string)
//           oObj.constructor.name;              
//     }   

//     // Test simple types (not constructed types)
//     return ( typeof oObj === "boolean")?'Boolean':
//            ( typeof oObj === "number")?'Number':
//            ( typeof oObj === "string")?'String':
//            ( typeof oObj === "function")?'Function':false;

// };

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
