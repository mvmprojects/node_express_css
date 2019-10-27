const express = require('express')
const app = express()
const port = 3000

// static files in folder 'public'
app.use(express.static('public'))

// pick up hardcoded test data as json in data.js
let data = require('./data');

// basic routing
app.get('/', function (req, res) {
  res.sendfile('/index.html');
})
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user')
// })
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })

// overview on http://localhost:3000/users
app.get("/users", (req, res) => {
   res.json(data);
});

// get specific record by id (http://localhost:3000/users/1)
app.get("/users/:id", (req, res) => {
   const userId = req.params.id;
   const user = data.find(_user => _user.id === userId);

   if (user) {
      res.json(user);
   } else {
      res.json({ message: `user ${userId} doesn't exist`})
   }
});

app.listen(port, () => console.log(`App is listening on port ${port}`))
